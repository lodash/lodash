#!/usr/bin/env node
;(function() {
  'use strict';

  /** The Node filesystem, `zlib`, path, child process, and HTTPS modules */
  var fs = require('fs'),
      zlib = require('zlib'),
      path = require('path'),
      spawn = require('child_process').spawn,
      https = require('https');

  /** The directory that is the base of the repository */
  var basePath = fs.realpathSync(path.join(__dirname, '..'));

  /** The `vendor` directory */
  var vendorPath = path.join(basePath, 'vendor');

  /** The directory where the Closure Compiler is located */
  var closurePath = path.join(vendorPath, 'closure-compiler', 'compiler.jar');

  /** The directory where UglifyJS is located */
  var uglifyPath = path.join(vendorPath, 'uglifyjs', 'uglify-js.js');

  /** Load other modules */
  var preprocess = require('./pre-compile'),
      postprocess = require('./post-compile'),
      tar = require('tar'),
      uglifyJS = null;

  /** Closure Compiler command-line options */
  var closureOptions = [
    '--compilation_level=ADVANCED_OPTIMIZATIONS',
    '--warning_level=QUIET'
  ];

  /** Reassign `existsSync` for older versions of Node */
  fs.existsSync || (fs.existsSync = path.existsSync);

  /*--------------------------------------------------------------------------*/

  /**
   * Fetches a required `.tar.gz` dependency with the given Git object ID from
   * the Lo-Dash repo on GitHub. The object ID may be obtained by running `git
   * hash-object path/to/dependency.tar.gz`.
   *
   * @param {String} source The Git object ID of the `.tar.gz` package.
   * @param {String|Object} The extraction target directory, or an object
   *   containing archived file names and target paths as key-value pairs.
   * @param {Function} callback The function to call once the extraction
   *  finishes.
   *
   */
  function getDependency(source, targets, callback) {
    https.get({
      'host': 'api.github.com',
      'path': '/repos/bestiejs/lodash/git/blobs/' + source,
      'headers': {
        'Accept': 'application/vnd.github.v3.raw'
      }
    }, function(response) {
      var parser;
      if (typeof targets == 'string') {
        parser = new tar.Extract({
          'path': targets
        });
      } else {
        parser = new tar.Parse();
        parser.on('entry', function(entry) {
          var path = entry.path;
          if (path in targets) {
            entry.pipe(fs.createWriteStream(targets[path]));
          }
        });
      }
      parser.on('end', function() {
        callback(null, targets);
      });
      parser.on('error', callback);
      response.pipe(zlib.createUnzip()).pipe(parser);
    }).on('error', callback);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * The exposed `minify` function minifies a given Lo-Dash `source` and invokes
   * the `onComplete` callback when finished.
   *
   * @param {Array|String} [source=''] The source to minify or array of commands.
   * @param {Object} [options={}] The options object.
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
   */
  function Minify(source, options) {
    // juggle arguments
    if (typeof source == 'object' && source) {
      options = source || options;
      source = options.source || '';
    }
    this.compiled = {};
    this.hybrid = {};
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
    closureCompile.call(this, source, onClosureCompile.bind(this));
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Compresses a `source` string using the Closure Compiler. Yields the
   * minified result, and any exceptions encountered, to a `callback` function.
   *
   * @private
   * @param {String} source The JavaScript source to minify.
   * @param {String} [message] The message to log.
   * @param {Function} callback The function to call once the process completes.
   */
  function closureCompile(source, message, callback) {
    if (!fs.existsSync(closurePath)) {
      return getDependency('aa29a2ecf6f51d4da5a2a418c0d4ea0e368ee80d', vendorPath, function(exception) {
        if (exception) {
          callback(exception);
        }
        closureCompile.call(this, source, message, callback)
      }.bind(this));
    }

    var options = closureOptions.slice();

    // use simple optimizations when minifying template files
    if (this.isTemplate) {
      options = options.map(function(value) {
        return value.replace(/^(--compilation_level)=.+$/, '$1=SIMPLE_OPTIMIZATIONS');
      });
    }

    // the standard error stream, standard output stream, and Closure Compiler process
    var error = '',
        output = '',
        compiler = spawn('java', ['-jar', closurePath].concat(options));

    // juggle arguments
    if (typeof message == 'function') {
      callback = message;
      message = null;
    }

    if (!this.isSilent) {
      console.log(message == null
        ? 'Compressing ' + path.basename(this.outputPath, '.js') + ' using the Closure Compiler...'
        : message
      );
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
      var exception = null;

      // `status` contains the process exit code
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
   * @param {String} [message] The message to log.
   * @param {Function} callback The function to call once the process completes.
   */
  function uglify(source, message, callback) {
    if (!uglifyJS) {
      if (fs.existsSync(uglifyPath)) {
        uglifyJS = require(uglifyPath);
      } else {
        return getDependency('827f406a02626c1c6723e8ae281b6785d36375c1', vendorPath, function(exception) {
          if (exception) {
            callback(exception);
          }
          uglify.call(this, source, message, callback);
        }.bind(this));
      }
    }

    var exception,
        result,
        ugly = uglifyJS.uglify;

    // juggle arguments
    if (typeof message == 'function') {
      callback = message;
      message = null;
    }

    if (!this.isSilent) {
      console.log(message == null
        ? 'Compressing ' + path.basename(this.outputPath, '.js') + ' using UglifyJS...'
        : message
      );
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
   * The `closureCompile()` callback.
   *
   * @private
   * @param {Object|Undefined} exception The error object.
   * @param {String} result The resulting minified source.
   */
  function onClosureCompile(exception, result) {
    if (exception) {
      throw exception;
    }
    // store the post-processed Closure Compiler result and gzip it
    this.compiled.source = result = postprocess(result);
    zlib.gzip(result, onClosureGzip.bind(this));
  }

  /**
   * The Closure Compiler `gzip` callback.
   *
   * @private
   * @param {Object|Undefined} exception The error object.
   * @param {Buffer} result The resulting gzipped source.
   */
  function onClosureGzip(exception, result) {
    if (exception) {
      throw exception;
    }
    if (!this.isSilent) {
      console.log('Done. Size: %d bytes.', result.length);
    }

    // store the gzipped result and report the size
    this.compiled.gzip = result;

    // next, minify the source using only UglifyJS
    uglify.call(this, this.source, onUglify.bind(this));
  }

  /**
   * The `uglify()` callback.
   *
   * @private
   * @param {Object|Undefined} exception The error object.
   * @param {String} result The resulting minified source.
   */
  function onUglify(exception, result) {
    if (exception) {
      throw exception;
    }
    // store the post-processed Uglified result and gzip it
    this.uglified.source = result = postprocess(result);
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
    if (!this.isSilent) {
      console.log('Done. Size: %d bytes.', result.length);
    }
    var message = 'Compressing  ' + path.basename(this.outputPath, '.js') + ' using hybrid minification...';

    // store the gzipped result and report the size
    this.uglified.gzip = result;

    // next, minify the Closure Compiler minified source using UglifyJS
    uglify.call(this, this.compiled.source, message, onHybrid.bind(this));
  }

  /**
   * The hybrid `uglify()` callback.
   *
   * @private
   * @param {Object|Undefined} exception The error object.
   * @param {String} result The resulting minified source.
   */
  function onHybrid(exception, result) {
    if (exception) {
      throw exception;
    }
    // store the post-processed Uglified result and gzip it
    this.hybrid.source = result = postprocess(result);
    zlib.gzip(result, onHybridGzip.bind(this));
  }

  /**
   * The hybrid `gzip` callback.
   *
   * @private
   * @param {Object|Undefined} exception The error object.
   * @param {Buffer} result The resulting gzipped source.
   */
  function onHybridGzip(exception, result) {
    if (exception) {
      throw exception;
    }
    if (!this.isSilent) {
      console.log('Done. Size: %d bytes.', result.length);
    }
    // store the gzipped result and report the size
    this.hybrid.gzip = result;

    // finish by choosing the smallest compressed file
    onComplete.call(this);
  }

  /**
   * The callback executed after JavaScript source is minified and gzipped.
   *
   * @private
   */
  function onComplete() {
    var compiled = this.compiled,
        hybrid = this.hybrid,
        uglified = this.uglified;

    // select the smallest gzipped file and use its minified counterpart as the
    // official minified release (ties go to Closure Compiler)
    var min = Math.min(compiled.gzip.length, hybrid.gzip.length, uglified.gzip.length);

    // pass the minified source to the minify instances "onComplete" callback
    this.onComplete(
      compiled.gzip.length == min
        ? compiled.source
        : uglified.gzip.length == min
          ? uglified.source
          : hybrid.source
    );
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
