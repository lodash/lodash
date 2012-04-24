#!/usr/bin/env node
;(function() {
  'use strict';

  /** The Node filesystem, path, and child process modules */
  var fs = require('fs'),
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
    'uglified': {}
  };

  /** Closure Compiler command-line options */
  var closureOptions = [
    '--compilation_level=ADVANCED_OPTIMIZATIONS',
    '--language_in=ECMASCRIPT5_STRICT',
    '--warning_level=QUIET'
  ];

  /** Gzip command-line options */
  var gzipOptions = ['-9f', '-c'];

  /** The pre-processed Lo-Dash source */
  var source = preprocess(fs.readFileSync(path.join(__dirname, 'lodash.js'), 'utf8'));

  /*--------------------------------------------------------------------------*/

  /**
   * Invokes a process with the given `name`, `parameters`, and `source` (used as
   * the standard input). Yields the result to a `callback` function. The optional
   * `encoding` argument specifies the output stream encoding.
   *
   * @private
   * @param {String} name The name of the process.
   * @param {Array} parameters An array of arguments to proxy to the process.
   * @param {String} source The standard input to proxy to the process.
   * @param {String} [encoding] The expected encoding of the output stream.
   * @param {Function} callback The function to call once the process completes.
   */
  function invoke(name, parameters, source, encoding, callback) {
    // the standard error stream, standard output stream, and process instance
    var error = '',
        output = '',
        process = spawn(name, parameters);

    // juggle arguments
    if (typeof encoding == 'string' && callback != null) {
      // explicitly set the encoding of the output stream if one is specified
      process.stdout.setEncoding(encoding);
    } else {
      callback = encoding;
      encoding = null;
    }

    process.stdout.on('data', function(data) {
      // append the data to the output stream
      output += data;
    });

    process.stderr.on('data', function(data) {
      // append the error message to the error stream
      error += data;
    });

    process.on('exit', function(status) {
      var exception = null;
      // `status` contains the process exit code
      if (status) {
        exception = new Error(error);
        exception.status = status;
      }
      callback(exception, output);
    });

    // proxy the standard input to the process
    process.stdin.end(source);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Compresses a `source` string using the Closure Compiler. Yields the
   * minified result, and any exceptions encountered, to a `callback` function.
   *
   * @private
   * @param {String} source The JavaScript source to minify.
   * @param {Function} callback The function to call once the process completes.
   */
  function closureCompile(source, callback) {
    console.log('Compressing lodash.js using the Closure Compiler...');
    invoke('java', ['-jar', closurePath].concat(closureOptions), source, callback);
  }

  /**
   * Compresses a `source` string using UglifyJS. Yields the result to a
   * `callback` function. This function is synchronous; the `callback` is used
   * for symmetry.
   *
   * @private
   * @param {String} source The JavaScript source to minify.
   * @param {Function} callback The function to call once the process completes.
   */
  function uglify(source, callback) {
    var exception,
        result,
        ugly = uglifyJS.uglify;

    console.log('Compressing lodash.js using UglifyJS...');

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
    invoke('gzip', gzipOptions, result, 'binary', onClosureGzip);
  }

  /**
   * The Closure Compiler `gzip` callback.
   *
   * @private
   * @param {Object|Undefined} exception The error object.
   * @param {String} result The resulting gzipped source.
   */
  function onClosureGzip(exception, result) {
    if (exception) {
      throw exception;
    }
    // store the gzipped result and report the size
    accumulator.compiled.gzip = result;
    console.log('Done. Size: %d KB.', result.length);

    // next, minify using UglifyJS
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
    accumulator.uglified.source = postprocess(result);
    invoke('gzip', gzipOptions, result, 'binary', onUglifyGzip);
  }

  /**
   * The UglifyJS `gzip` callback.
   *
   * @private
   * @param {Object|Undefined} exception The error object.
   * @param {String} result The resulting gzipped source.
   */
  function onUglifyGzip(exception, result) {
    if (exception) {
      throw exception;
    }
    // store the gzipped result and report the size
    accumulator.uglified.gzip = result;
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
        uglified = accumulator.uglified;

    // save the Closure Compiled version to disk
    fs.writeFileSync(path.join(distPath, 'lodash.compiler.js'), compiled.source);
    // explicit 'binary' is necessary to ensure the stream is written correctly
    fs.writeFileSync(path.join(distPath, 'lodash.compiler.js.gz'), compiled.gzip, 'binary');

    // save the Uglified version to disk
    fs.writeFileSync(path.join(distPath, 'lodash.uglify.js'), uglified.source);
    fs.writeFileSync(path.join(distPath, 'lodash.uglify.js.gz'), uglified.gzip, 'binary');

    // select the smallest gzipped file and use its minified form as the
    // official minified release (ties go to Closure Compiler)
    fs.writeFileSync(path.join(__dirname, 'lodash.min.js'),
      uglified.gzip.length < compiled.gzip.length
        ? uglified.source
        : compiled.source
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
