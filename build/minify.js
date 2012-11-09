#!/usr/bin/env node
;(function() {
  'use strict';

  /** The Node filesystem, path, `zlib`, and child process modules */
  var fs = require('fs'),
      gzip = require('zlib').gzip,
      path = require('path'),
      spawn = require('child_process').spawn;

  /** The path of the directory that is the base of the repository */
  var basePath = fs.realpathSync(path.join(__dirname, '..'));

  /** The path of the directory where the Closure Compiler is located */
  var closurePath = path.join(basePath, 'vendor', 'closure-compiler', 'compiler.jar');

  /** Load other modules */
  var preprocess = require('./pre-compile.js'),
      postprocess = require('./post-compile.js'),
      uglifyJS = require('../vendor/uglifyjs/uglify-js.js');

  /** The Closure Compiler command-line options */
  var closureOptions = ['--warning_level=QUIET'];

  /** The Closure Compiler optimization modes */
  var optimizationModes = {
    'simple': 'SIMPLE_OPTIMIZATIONS',
    'advanced': 'ADVANCED_OPTIMIZATIONS'
  };

  /** Reassign `existsSync` for older versions of Node */
  fs.existsSync || (fs.existsSync = path.existsSync);

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
    source || (source = '');
    options || (options = {});

    // juggle arguments
    if (Array.isArray(source)) {
      // convert commands to an options object
      options = source;

      var filePath = options[options.length - 1],
          isSilent = options.indexOf('-s') > -1 || options.indexOf('--silent') > -1,
          isTemplate = options.indexOf('-t') > -1 || options.indexOf('--template') > -1,
          outputPath = path.join(path.dirname(filePath), path.basename(filePath, '.js') + '.min.js');

      outputPath = options.reduce(function(result, value, index) {
        if (/-o|--output/.test(value)) {
          result = options[index + 1];
          result = path.join(fs.realpathSync(path.dirname(result)), path.basename(result));
        }
        return result;
      }, outputPath);

      options = {
        'isSilent': isSilent,
        'isTemplate': isTemplate,
        'outputPath': outputPath
      };

      source = fs.readFileSync(filePath, 'utf8');
    }
    new Minify(source, options);
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

    this.isSilent = !!options.isSilent;
    this.isTemplate = !!options.isTemplate;
    this.outputPath = options.outputPath;

    source = preprocess(source, options);
    this.source = source;

    this.onComplete = options.onComplete || function(source) {
      fs.writeFileSync(this.outputPath, source, 'utf8');
    };

    // begin the minification process
    closureCompile.call(this, source, 'simple', onClosureSimpleCompile.bind(this));
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
    // use simple optimizations when minifying template files
    var options = closureOptions.slice();
    options.push('--compilation_level=' + optimizationModes[this.isTemplate ? 'simple' : mode]);

    // the standard error stream, standard output stream, and the Closure Compiler process
    var error = '',
        output = '',
        compiler = spawn('java', ['-jar', closurePath].concat(options));

    if (!this.isSilent) {
      console.log('Compressing ' + path.basename(this.outputPath, '.js') + ' using the Closure Compiler (' + mode + ')...');
    }
    compiler.stdout.on('data', function(data) {
      // append the data to the output stream
      output += data;
    });

    compiler.stderr.on('data', function(data) {
      // append the error message to the error stream
      error += data;
    });

    compiler.on('exit', function(status) {
      // `status` contains the process exit code
      var exception = null;
      if (status) {
        exception = new Error(error);
        exception.status = status;
      }
      callback(exception, output);
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
    var exception,
        result,
        ugly = uglifyJS.uglify;

    if (!this.isSilent) {
      console.log('Compressing ' + path.basename(this.outputPath, '.js') + ' using ' + label + '...');
    }
    try {
      result = ugly.gen_code(
        // enable unsafe transformations
        ugly.ast_squeeze_more(
          ugly.ast_squeeze(
            // munge variable and function names, excluding the special `define`
            // function exposed by AMD loaders
            ugly.ast_mangle(uglifyJS.parser.parse(source), {
              'except': ['define']
            }
        ))), {
        'ascii_only': true
      });
    } catch(e) {
      exception = e;
    }
    // lines are restricted to 500 characters for consistency with the Closure Compiler
    callback(exception, result && ugly.split_lines(result, 500));
  }

  /*--------------------------------------------------------------------------*/

  /**
   * The Closure Compiler callback for simple optimizations.
   *
   * @private
   * @param {Object|Undefined} exception The error object.
   * @param {String} result The resulting minified source.
   */
  function onClosureSimpleCompile(exception, result) {
    if (exception) {
      throw exception;
    }
    result = postprocess(result);
    this.compiled.simple.source = result;
    gzip(result, onClosureSimpleGzip.bind(this));
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
    if (!this.isSilent) {
      console.log('Done. Size: %d bytes.', result.length);
    }
    this.compiled.simple.gzip = result;

    // next, compile the source using advanced optimizations
    closureCompile.call(this, this.source, 'advanced', onClosureAdvancedCompile.bind(this));
  }

  /**
   * The Closure Compiler callback for advanced optimizations.
   *
   * @private
   * @param {Object|Undefined} exception The error object.
   * @param {String} result The resulting minified source.
   */
  function onClosureAdvancedCompile(exception, result) {
    if (exception) {
      throw exception;
    }
    result = postprocess(result);
    this.compiled.advanced.source = result;
    gzip(result, onClosureAdvancedGzip.bind(this));
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
    if (!this.isSilent) {
      console.log('Done. Size: %d bytes.', result.length);
    }
    this.compiled.advanced.gzip = result;

    // next, minify the source using only UglifyJS
    uglify.call(this, this.source, 'UglifyJS', onUglify.bind(this));
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
    gzip(result, onUglifyGzip.bind(this));
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
    if (!this.isSilent) {
      console.log('Done. Size: %d bytes.', result.length);
    }
    this.uglified.gzip = result;

    // next, minify the already Closure Compiler simple optimized source using UglifyJS
    uglify.call(this, this.compiled.simple.source, 'hybrid (simple)', onSimpleHybrid.bind(this));
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
    gzip(result, onSimpleHybridGzip.bind(this));
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
    if (!this.isSilent) {
      console.log('Done. Size: %d bytes.', result.length);
    }
    this.hybrid.simple.gzip = result;

    // next, minify the already Closure Compiler advance optimized source using UglifyJS
    uglify.call(this, this.compiled.advanced.source, 'hybrid (advanced)', onAdvancedHybrid.bind(this));
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
    gzip(result, onAdvancedHybridGzip.bind(this));
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
    if (!this.isSilent) {
      console.log('Done. Size: %d bytes.', result.length);
    }
    this.hybrid.advanced.gzip = result;

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

    // select the smallest gzipped file and use its minified counterpart as the
    // official minified release (ties go to the Closure Compiler)
    var min = Math.min(
      compiledSimple.gzip.length,
      compiledAdvanced.gzip.length,
      uglified.gzip.length,
      hybridSimple.gzip.length,
      hybridAdvanced.gzip.length
    );

    // pass the minified source to the "onComplete" callback
    [compiledSimple, compiledAdvanced, uglified, hybridSimple, hybridAdvanced].some(function(data) {
      if (data.gzip.length == min) {
        this.onComplete(data.source);
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
