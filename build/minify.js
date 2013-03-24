#!/usr/bin/env node
;(function() {
  'use strict';

  /** Load Node.js modules */
  var fs = require('fs'),
      https = require('https'),
      path = require('path'),
      spawn = require('child_process').spawn,
      zlib = require('zlib');

  /** Load other modules */
  var _ = require('../lodash.js'),
      mkdirpSync = require('./mkdirp-sync.js'),
      preprocess = require('./pre-compile.js'),
      postprocess = require('./post-compile.js'),
      tar = require('../vendor/tar/tar.js');

  /** Add `fs.existsSync` for older versions of Node.js */
  fs.existsSync || (fs.existsSync = path.existsSync);

  /** Add `path.sep` for older versions of Node.js */
  path.sep || (path.sep = process.platform == 'win32' ? '\\' : '/');

  /** The Git object ID of `closure-compiler.tar.gz` */
  var closureId = 'a95a8007892aa824ce90c6aa3d3abb0489bf0fff';

  /** The Git object ID of `uglifyjs.tar.gz` */
  var uglifyId = '41308bd569db41a32d4f08af115875d0342e8bfb';

  /** The path of the directory that is the base of the repository */
  var basePath = fs.realpathSync(path.join(__dirname, '..'));

  /** The path of the `vendor` directory */
  var vendorPath = path.join(basePath, 'vendor');

  /** The path to the Closure Compiler `.jar` */
  var closurePath = path.join(vendorPath, 'closure-compiler', 'compiler.jar');

  /** The path to the UglifyJS module */
  var uglifyPath = path.join(vendorPath, 'uglifyjs', 'tools', 'node.js');

  /** The Closure Compiler command-line options */
  var closureOptions = ['--warning_level=QUIET'];

  /** The media type for raw blob data */
  var mediaType = 'application/vnd.github.v3.raw';

  /** Used to detect the Node.js executable in command-line arguments */
  var reNode = RegExp('(?:^|' + path.sep + ')node(?:\\.exe)?$');

  /** Used to reference parts of the blob href */
  var location = (function() {
    var host = 'api.github.com',
        origin = 'https://api.github.com',
        pathname = '/repos/bestiejs/lodash/git/blobs';

    return {
      'host': host,
      'href': origin + pathname,
      'origin': origin,
      'pathname': pathname
    };
  }());

  /** The Closure Compiler optimization modes */
  var optimizationModes = {
    'simple': 'SIMPLE_OPTIMIZATIONS',
    'advanced': 'ADVANCED_OPTIMIZATIONS'
  };

  /*--------------------------------------------------------------------------*/

  /**
   * Minifies a given Lo-Dash `source` and invokes the `options.onComplete`
   * callback when finished. The `onComplete` callback is invoked with one
   * argument; (outputSource).
   *
   * @param {Array|String} [source=''] The source to minify or array of commands.
   *  -o, --output - Write output to a given path/filename.
   *  -s, --silent - Skip status updates normally logged to the console.
   *  -t, --template - Applies template specific minifier options.
   *
   * @param {Object} [options={}] The options object.
   *  outputPath - Write output to a given path/filename.
   *  isSilent - Skip status updates normally logged to the console.
   *  isTemplate - Applies template specific minifier options.
   *  onComplete - The function called once minification has finished.
   */
  function minify(source, options) {
    // used to specify the source map URL
    var sourceMapURL;

    // used to specify the default minifer modes
    var modes = ['simple', 'advanced', 'hybrid'];

    source || (source = '');
    options || (options = {});

    // juggle arguments
    if (Array.isArray(source)) {
      // convert commands to an options object
      options = source;

      // used to report invalid command-line arguments
      var invalidArgs = _.reject(options.slice(reNode.test(options[0]) ? 2 : 0), function(value, index, options) {
        if (/^(?:-o|--output)$/.test(options[index - 1]) ||
            /^modes=.*$/.test(value)) {
          return true;
        }
        var result = [
          '-o', '--output',
          '-p', '--source-map',
          '-s', '--silent',
          '-t', '--template'
        ].indexOf(value) > -1;

        if (!result && /^(?:-p|--source-map)$/.test(options[index - 1])) {
          result = true;
          sourceMapURL = value;
        }
        return result;
      });

      // report invalid arguments
      if (invalidArgs.length) {
        console.log(
          '\n' +
          'Invalid argument' + (invalidArgs.length > 1 ? 's' : '') +
          ' passed: ' + invalidArgs.join(', ')
        );
        return;
      }
      var filePath = options[options.length - 1],
          isMapped = _.contains(options, '-p') || _.contains(options, '--source-map'),
          isSilent = _.contains(options, '-s') || _.contains(options, '--silent'),
          isTemplate = _.contains(options, '-t') || _.contains(options, '--template'),
          outputPath = path.join(path.dirname(filePath), path.basename(filePath, '.js') + '.min.js');

      modes = options.reduce(function(result, value) {
        var match = value.match(/modes=(.*)$/);
        return match ? match[1].split(/, */) : result;
      }, modes);

      outputPath = options.reduce(function(result, value, index) {
        if (/-o|--output/.test(value)) {
          result = options[index + 1];
          var dirname = path.dirname(result);
          mkdirpSync(dirname);
          result = path.join(fs.realpathSync(dirname), path.basename(result));
        }
        return result;
      }, outputPath);

      options = {
        'filePath': filePath,
        'isMapped': isMapped,
        'isSilent': isSilent,
        'isTemplate': isTemplate,
        'modes': modes,
        'outputPath': outputPath,
        'sourceMapURL': sourceMapURL
      };

      source = fs.readFileSync(filePath, 'utf8');
    }

    modes = options.modes || modes;
    if (options.isMapped) {
      modes = modes.filter(function(mode) {
        return mode != 'hybrid';
      });
    }
    if (options.isTemplate) {
      modes = modes.filter(function(mode) {
        return mode != 'advanced';
      });
    }
    options.modes = modes;

    // fetch the Closure Compiler
    getDependency({
      'id': 'closure-compiler',
      'hashId': closureId,
      'path': vendorPath,
      'title': 'the Closure Compiler',
      'onComplete': function(exception) {
        var error = exception;

        // fetch UglifyJS
        getDependency({
          'id': 'uglifyjs',
          'hashId': uglifyId,
          'title': 'UglifyJS',
          'path': vendorPath,
          'onComplete': function(exception) {
            error || (error = exception);
            if (!error) {
              new Minify(source, options);
            }
          }
        });
      }
    });
  }

  /**
   * The Minify constructor used to keep state of each `minify` invocation.
   *
   * @private
   * @constructor
   * @param {String} source The source to minify.
   * @param {Object} options The options object.
   *  outputPath - Write output to a given path/filename.
   *  isSilent - Skip status updates normally logged to the console.
   *  isTemplate - Applies template specific minifier options.
   *  onComplete - The function called once minification has finished.
   */
  function Minify(source, options) {
    // juggle arguments
    if (typeof source == 'object' && source) {
      options = source || options;
      source = options.source || '';
    }
    this.compiled = { 'simple': {}, 'advanced': {} };
    this.hybrid = { 'simple': {}, 'advanced': {} };
    this.uglified = {};

    this.filePath = options.filePath;
    this.isMapped = !!options.isMapped;
    this.isSilent = !!options.isSilent;
    this.isTemplate = !!options.isTemplate;
    this.outputPath = options.outputPath;
    this.sourceMapURL = options.sourceMapURL;

    var modes = this.modes = options.modes;
    source = this.source = preprocess(source, options);

    this.onComplete = options.onComplete || function(data) {
      var outputPath = this.outputPath,
          sourceMap = data.sourceMap;

      fs.writeFileSync(outputPath, data.source, 'utf8');
      if (sourceMap) {
        fs.writeFileSync(getMapPath(outputPath), sourceMap, 'utf8');
      }
    };

    // begin the minification process
    if (_.contains(modes, 'simple')) {
      closureCompile.call(this, source, 'simple', onClosureSimpleCompile.bind(this));
    } else if (_.contains(modes, 'advanced')) {
      onClosureSimpleGzip.call(this);
    } else {
      onClosureAdvancedGzip.call(this);
    }
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Fetches a required `.tar.gz` dependency with the given Git object ID from
   * the Lo-Dash repo on GitHub. The object ID may be obtained by running
   * `git hash-object path/to/dependency.tar.gz`.
   *
   * @private
   * @param {Object} options The options object.
   *  id - The Git object ID of the `.tar.gz` file.
   *  onComplete - The function called once the extraction has finished.
   *  path - The path of the extraction directory.
   *  title - The dependency's title used in status updates logged to the console.
   */
  function getDependency(options) {
    options || (options = {});

    var ran,
        destPath = options.path,
        hashId = options.hashId,
        id = options.id,
        onComplete = options.onComplete,
        title = options.title;

    // exit early if dependency exists
    if (fs.existsSync(path.join(destPath, id))) {
      onComplete();
      return;
    }
    var callback = function(exception) {
      if (ran) {
        return;
      }
      if (exception) {
        console.error([
          'There was a problem installing ' + title + '.',
          'Try running the command as root, via `sudo`, or manually install by running:',
          '',
          "curl -H 'Accept: " + mediaType + "' " + location.href + '/' + hashId + " | tar xvz -C '" + destPath + "'",
          ''
        ].join('\n'));
      }
      ran = true;
      process.removeListener('uncaughtException', callback);
      onComplete(exception);
    };

    console.log('Downloading ' + title + '...');
    process.on('uncaughtException', callback);

    https.get({
      'host': location.host,
      'path': location.pathname + '/' + hashId,
      'headers': {
        // By default, all GitHub blob API endpoints return a JSON document
        // containing Base64-encoded blob data. Overriding the `Accept` header
        // with the GitHub raw media type returns the blob data directly.
        // See http://developer.github.com/v3/media/.
        'Accept': mediaType
      }
    }, function(response) {
      var decompressor = zlib.createUnzip(),
          parser = new tar.Extract({ 'path': destPath });

      parser.on('end', callback);
      response.pipe(decompressor).pipe(parser);
    });
  }

  /**
   * Resolves the source map path from the given output path.
   *
   * @private
   * @param {String} outputPath The output path.
   * @returns {String} Returns the source map path.
   */
  function getMapPath(outputPath) {
    return path.join(path.dirname(outputPath), path.basename(outputPath, '.js') + '.map');
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Compresses a `source` string using the Closure Compiler. Yields the
   * minified result, and any exceptions encountered, to a `callback` function.
   *
   * @private
   * @param {String} source The JavaScript source to minify.
   * @param {String} mode The optimization mode.
   * @param {Function} callback The function called once the process has completed.
   */
  function closureCompile(source, mode, callback) {
    var filePath = this.filePath,
        isAdvanced = mode == 'advanced',
        isMapped = this.isMapped,
        options = closureOptions.slice(),
        outputPath = this.outputPath,
        mapPath = getMapPath(outputPath),
        sourceMapURL = this.sourceMapURL || path.basename(mapPath);

    // remove copyright header to make other modifications easier
    var license = (/^(?:\s*\/\/.*\s*|\s*\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/\s*)*/.exec(source) || [''])[0];
    if (license) {
      source = source.replace(license, '');
    }

    var hasIIFE = /^;?\(function[^{]+{/.test(source),
        isStrict = hasIIFE && /^;?\(function[^{]+{\s*["']use strict["']/.test(source);

    // to avoid stripping the IIFE, convert it to a function call
    if (hasIIFE && isAdvanced) {
      source = source
        .replace(/\(function/, '__iife__$&')
        .replace(/\(this\)\)([\s;]*(\n\/\/.+)?)$/, ', this)$1');
    }

    options.push('--compilation_level=' + optimizationModes[mode]);
    if (isMapped) {
      options.push('--create_source_map=' + mapPath, '--source_map_format=V3');
    }

    var compiler = spawn('java', ['-jar', closurePath].concat(options));
    if (!this.isSilent) {
      console.log('Compressing ' + path.basename(outputPath, '.js') + ' using the Closure Compiler (' + mode + ')...');
    }

    var error = '';
    compiler.stderr.on('data', function(data) {
      error += data;
    });

    var output = '';
    compiler.stdout.on('data', function(data) {
      output += data;
    });

    compiler.on('exit', function(status) {
      // `status` contains the process exit code
      if (status) {
        var exception = new Error(error);
        exception.status = status;
      }
      // restore IIFE and move exposed vars inside the IIFE
      if (hasIIFE && isAdvanced) {
        output = output
          .replace(/__iife__\(/, '(')
          .replace(/,\s*this\)([\s;]*(\n\/\/.+)?)$/, '(this))$1')
          .replace(/^((?:var (?:\w+=(?:!0|!1|null)[,;])+)?)([\s\S]*?function[^{]+{)/, '$2$1');
      }
      // inject "use strict" directive
      if (isStrict) {
        output = output.replace(/^[\s\S]*?function[^{]+{/, '$&"use strict";');
      }
      // restore copyright header
      if (license) {
        output = license + output;
      }
      if (isMapped) {
        var mapOutput = fs.readFileSync(mapPath, 'utf8');
        fs.unlinkSync(mapPath);
        output = output.replace(/[\s;]*$/, '\n/*\n//@ sourceMappingURL=' + sourceMapURL) + '\n*/';

        mapOutput = JSON.parse(mapOutput);
        mapOutput.file = path.basename(outputPath);
        mapOutput.sources = [path.basename(filePath)];
        mapOutput = JSON.stringify(mapOutput, null, 2);
      }
      callback(exception, output, mapOutput);
    });

    // proxy the standard input to the Closure Compiler
    compiler.stdin.end(source);
  }

  /**
   * Compresses a `source` string using UglifyJS. Yields the result to a
   * `callback` function. This function is synchronous; the `callback` is used
   * for symmetry.
   *
   * @private
   * @param {String} source The JavaScript source to minify.
   * @param {String} label The label to log.
   * @param {Function} callback The function called once the process has completed.
   */
  function uglify(source, label, callback) {
    if (!this.isSilent) {
      console.log('Compressing ' + path.basename(this.outputPath, '.js') + ' using ' + label + '...');
    }
    try {
      var uglifyJS = require(uglifyPath);

      // 1. parse
      var toplevel = uglifyJS.parse(source);

      // 2. compress
      // enable unsafe comparisons
      toplevel.figure_out_scope();
      toplevel = toplevel.transform(uglifyJS.Compressor({
        'comparisons': false,
        'unsafe': true,
        'unsafe_comps': true,
        'warnings': false
      }));

      // 3. mangle
      // excluding the `define` function exposed by AMD loaders
      toplevel.figure_out_scope();
      toplevel.compute_char_frequency();
      toplevel.mangle_names({
        'except': ['define']
      });

      // 4. output
      // restrict lines to 500 characters for consistency with the Closure Compiler
      var stream = uglifyJS.OutputStream({
        'ascii_only': true,
        'comments': /@cc_on|@license|@preserve/i,
        'max_line_len': 500,
      });

      toplevel.print(stream);
    }
    catch(e) {
      var exception = e;
    }
    callback(exception, stream && String(stream));
  }

  /*--------------------------------------------------------------------------*/

  /**
   * The Closure Compiler callback for simple optimizations.
   *
   * @private
   * @param {Object|Undefined} exception The error object.
   * @param {String} result The resulting minified source.
   * @param {String} map The source map output.
   */
  function onClosureSimpleCompile(exception, result, map) {
    if (exception) {
      throw exception;
    }
    result = postprocess(result);

    var simple = this.compiled.simple;
    simple.source = result;
    simple.sourceMap = map;
    zlib.gzip(result, onClosureSimpleGzip.bind(this));
  }

  /**
   * The Closure Compiler `gzip` callback for simple optimizations.
   *
   * @private
   * @param {Object|Undefined} exception The error object.
   * @param {Buffer} result The resulting gzipped source.
   */
  function onClosureSimpleGzip(exception, result) {
    if (exception) {
      throw exception;
    }
    if (result != null) {
      if (!this.isSilent) {
        console.log('Done. Size: %d bytes.', result.length);
      }
      this.compiled.simple.gzip = result;
    }
    // compile the source using advanced optimizations
    if (_.contains(this.modes, 'advanced')) {
      closureCompile.call(this, this.source, 'advanced', onClosureAdvancedCompile.bind(this));
    } else {
      onClosureAdvancedGzip.call(this);
    }
  }

  /**
   * The Closure Compiler callback for advanced optimizations.
   *
   * @private
   * @param {Object|Undefined} exception The error object.
   * @param {String} result The resulting minified source.
   * @param {String} map The source map output.
   */
  function onClosureAdvancedCompile(exception, result, map) {
    if (exception) {
      throw exception;
    }
    result = postprocess(result);

    var advanced = this.compiled.advanced;
    advanced.source = result;
    advanced.sourceMap = map;
    zlib.gzip(result, onClosureAdvancedGzip.bind(this));
  }

  /**
   * The Closure Compiler `gzip` callback for advanced optimizations.
   *
   * @private
   * @param {Object|Undefined} exception The error object.
   * @param {Buffer} result The resulting gzipped source.
   */
  function onClosureAdvancedGzip(exception, result) {
    if (exception) {
      throw exception;
    }
    if (result != null) {
      if (!this.isSilent) {
        console.log('Done. Size: %d bytes.', result.length);
      }
      this.compiled.advanced.gzip = result;
    }
    // minify the source using UglifyJS
    if (!this.isMapped) {
      uglify.call(this, this.source, 'UglifyJS', onUglify.bind(this));
    } else {
      onComplete.call(this);
    }
  }

  /**
   * The UglifyJS callback.
   *
   * @private
   * @param {Object|Undefined} exception The error object.
   * @param {String} result The resulting minified source.
   */
  function onUglify(exception, result) {
    if (exception) {
      throw exception;
    }
    result = postprocess(result);
    this.uglified.source = result;
    zlib.gzip(result, onUglifyGzip.bind(this));
  }

  /**
   * The UglifyJS `gzip` callback.
   *
   * @private
   * @param {Object|Undefined} exception The error object.
   * @param {Buffer} result The resulting gzipped source.
   */
  function onUglifyGzip(exception, result) {
    if (exception) {
      throw exception;
    }
    if (result != null) {
      if (!this.isSilent) {
        console.log('Done. Size: %d bytes.', result.length);
      }
      this.uglified.gzip = result;
    }
    // minify the already Closure Compiler simple optimized source using UglifyJS
    var modes = this.modes;
    if (_.contains(modes, 'hybrid')) {
      if (_.contains(modes, 'simple')) {
        uglify.call(this, this.compiled.simple.source, 'hybrid (simple)', onSimpleHybrid.bind(this));
      } else if (_.contains(modes, 'advanced')) {
        onSimpleHybridGzip.call(this);
      }
    } else {
      onComplete.call(this);
    }
  }

  /**
   * The hybrid callback for simple optimizations.
   *
   * @private
   * @param {Object|Undefined} exception The error object.
   * @param {String} result The resulting minified source.
   */
  function onSimpleHybrid(exception, result) {
    if (exception) {
      throw exception;
    }
    result = postprocess(result);
    this.hybrid.simple.source = result;
    zlib.gzip(result, onSimpleHybridGzip.bind(this));
  }

  /**
   * The hybrid `gzip` callback for simple optimizations.
   *
   * @private
   * @param {Object|Undefined} exception The error object.
   * @param {Buffer} result The resulting gzipped source.
   */
  function onSimpleHybridGzip(exception, result) {
    if (exception) {
      throw exception;
    }
    if (result != null) {
      if (!this.isSilent) {
        console.log('Done. Size: %d bytes.', result.length);
      }
      this.hybrid.simple.gzip = result;
    }
    // minify the already Closure Compiler advance optimized source using UglifyJS
    if (_.contains(this.modes, 'advanced')) {
      uglify.call(this, this.compiled.advanced.source, 'hybrid (advanced)', onAdvancedHybrid.bind(this));
    } else {
      onComplete.call(this);
    }
  }

  /**
   * The hybrid callback for advanced optimizations.
   *
   * @private
   * @param {Object|Undefined} exception The error object.
   * @param {String} result The resulting minified source.
   */
  function onAdvancedHybrid(exception, result) {
    if (exception) {
      throw exception;
    }
    result = postprocess(result);
    this.hybrid.advanced.source = result;
    zlib.gzip(result, onAdvancedHybridGzip.bind(this));
  }

  /**
   * The hybrid `gzip` callback for advanced optimizations.
   *
   * @private
   * @param {Object|Undefined} exception The error object.
   * @param {Buffer} result The resulting gzipped source.
   */
  function onAdvancedHybridGzip(exception, result) {
    if (exception) {
      throw exception;
    }
    if (result != null) {
      if (!this.isSilent) {
        console.log('Done. Size: %d bytes.', result.length);
      }
      this.hybrid.advanced.gzip = result;
    }
    // finish by choosing the smallest compressed file
    onComplete.call(this);
  }

  /**
   * The callback executed after the source is minified and gzipped.
   *
   * @private
   */
  function onComplete() {
    var compiledSimple = this.compiled.simple,
        compiledAdvanced = this.compiled.advanced,
        uglified = this.uglified,
        hybridSimple = this.hybrid.simple,
        hybridAdvanced = this.hybrid.advanced;

    var objects = [
      compiledSimple,
      compiledAdvanced,
      uglified,
      hybridSimple,
      hybridAdvanced
    ];

    var gzips = objects
      .map(function(data) { return data.gzip; })
      .filter(Boolean);

    // select the smallest gzipped file and use its minified counterpart as the
    // official minified release (ties go to the Closure Compiler)
    var min = gzips.reduce(function(min, gzip) {
      var length = gzip.length;
      return min > length ? length : min;
    }, Infinity);

    // pass the minified source to the "onComplete" callback
    objects.some(function(data) {
      var gzip = data.gzip;
      if (gzip && gzip.length == min) {
        data.outputPath = this.outputPath;
        this.onComplete(data);
        return true;
      }
    }, this);
  }

  /*--------------------------------------------------------------------------*/

  // expose `minify`
  if (module != require.main) {
    module.exports = minify;
  }
  else {
    // read the Lo-Dash source file from the first argument if the script
    // was invoked directly (e.g. `node minify.js source.js`) and write to
    // `<filename>.min.js`
    (function() {
      var options = process.argv;
      if (options.length < 3) {
        return;
      }
      minify(options);
    }());
  }
}());
