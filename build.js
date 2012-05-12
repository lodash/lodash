#!/usr/bin/env node
;(function() {
  'use strict';

  /** The Node filesystem, path, `zlib`, and child process modules */
  var fs = require('fs'),
      gzip = require('zlib').gzip,
      path = require('path'),
      spawn = require('child_process').spawn;

  /** The build directory containing the build scripts */
  var buildPath = path.join(__dirname, 'build');

  /** The directory where the Closure Compiler is located */
  var closurePath = path.join(__dirname, 'vendor', 'closure-compiler', 'compiler.jar');

  /** The distribution directory */
  var distPath = path.join(__dirname, 'dist');

  /** Load other modules */
  var preprocess = require(path.join(buildPath, 'pre-compile')),
      postprocess = require(path.join(buildPath, 'post-compile')),
      uglifyJS = require(path.join(__dirname, 'vendor', 'uglifyjs', 'uglify-js'));

  /** Used to shares values between multiple callbacks */
  var accumulator = {
    'compiled': {},
    'hybrid': {},
    'uglified': {}
  };

  /** Closure Compiler command-line options */
  var closureOptions = [
    '--compilation_level=ADVANCED_OPTIMIZATIONS',
    '--language_in=ECMASCRIPT5_STRICT',
    '--warning_level=QUIET'
  ];

  /** The pre-processed Lo-Dash source */
  var source = preprocess(fs.readFileSync(path.join(__dirname, 'lodash.js'), 'utf8'));

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
    // the standard error stream, standard output stream, and Closure Compiler process
    var error = '',
        output = '',
        compiler = spawn('java', ['-jar', closurePath].concat(closureOptions));

    // juggle arguments
    if (typeof message == 'function') {
      callback = message;
      message = null;
    }

    console.log(message == null ? 'Compressing lodash.js using the Closure Compiler...' : message);

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
    var exception,
        result,
        ugly = uglifyJS.uglify;

    // juggle arguments
    if (typeof message == 'function') {
      callback = message;
      message = null;
    }

    console.log(message == null ? 'Compressing lodash.js using UglifyJS...' : message);

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
    accumulator.compiled.source = result = postprocess(result);
    gzip(result, onClosureGzip);
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
    // store the gzipped result and report the size
    accumulator.compiled.gzip = result;
    console.log('Done. Size: %d KB.', result.length);

    // next, minify the source using only UglifyJS
    uglify(source, onUglify);
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
    accumulator.uglified.source = result = postprocess(result);
    gzip(result, onUglifyGzip);
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
    var message = 'Compressing lodash.js combining Closure Compiler and UglifyJS...';

    // store the gzipped result and report the size
    accumulator.uglified.gzip = result;
    console.log('Done. Size: %d KB.', result.length);

    // next, minify the Closure Compiler minified source using UglifyJS
    uglify(accumulator.compiled.source, message, onHybrid);
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
    accumulator.hybrid.source = result = postprocess(result);
    gzip(result, onHybridGzip);
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
    // store the gzipped result and report the size
    accumulator.hybrid.gzip = result;
    console.log('Done. Size: %d KB.', result.length);

    // finish by choosing the smallest compressed file
    onComplete();
  }

  /**
   * The callback executed after JavaScript source is minified and gzipped.
   *
   * @private
   */
  function onComplete() {
    var compiled = accumulator.compiled,
        hybrid = accumulator.hybrid,
        uglified = accumulator.uglified;

    // save the Closure Compiled version to disk
    fs.writeFileSync(path.join(distPath, 'lodash.compiler.js'), compiled.source);
    fs.writeFileSync(path.join(distPath, 'lodash.compiler.js.gz'), compiled.gzip);

    // save the Uglified version to disk
    fs.writeFileSync(path.join(distPath, 'lodash.uglify.js'), uglified.source);
    fs.writeFileSync(path.join(distPath, 'lodash.uglify.js.gz'), uglified.gzip);

    // save the hybrid minified version to disk
    fs.writeFileSync(path.join(distPath, 'lodash.hybrid.js'), hybrid.source);
    fs.writeFileSync(path.join(distPath, 'lodash.hybrid.js.gz'), hybrid.gzip);

    // select the smallest gzipped file and use its minified counterpart as the
    // official minified release (ties go to Closure Compiler)
    var min = Math.min(compiled.gzip.length, hybrid.gzip.length, uglified.gzip.length);

    fs.writeFileSync(path.join(__dirname, 'lodash.min.js'),
      compiled.gzip.length == min
        ? compiled.source
        : uglified.gzip.length == min
          ? uglified.source
          : hybrid.source
    );
  }

  /*--------------------------------------------------------------------------*/

  // create the destination directory if it doesn't exist
  if (!path.existsSync(distPath)) {
    fs.mkdirSync(distPath);
  }
  // begin the minification process
  closureCompile(source, onClosureCompile);
}());
