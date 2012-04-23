#!/usr/bin/env node
;(function() {
  'use strict';

  /** The Node filesystem, path, and child process modules */
  var fs = require('fs'),
      path = require('path'),
      spawn = require('child_process').spawn;

  /** The build directory containing the build scripts */
  var buildPath = path.join(__dirname, 'build');

  /** The distribution directory */
  var distPath = path.join(__dirname, 'dist');

  /** Load the pre- and post-processors */
  var preprocess = require(path.join(buildPath, 'pre-compile')),
      postprocess = require(path.join(buildPath, 'post-compile'));

  /** The pre-processed Lo-Dash source */
  var source = preprocess(fs.readFileSync(path.join(__dirname, 'lodash.js'), 'utf8'));

  /** Load the UglifyJS compressor */
  var uglifyJS = require(path.join(__dirname, 'vendor', 'uglifyjs', 'uglify-js'));

  /*--------------------------------------------------------------------------*/

  /**
   * Compresses a `source` string using the Closure Compiler. Yields the
   * minified result, and any exceptions encountered, to a `callback` function.
   *
   * @private
   * @param {String} source The JavaScript source to minify.
   * @param {Function} callback The function called when minifying is complete.
   */
  function compile(source, callback) {
    var stderr = '',
        stdout = '';

    var compiler = spawn('java', [
      // load the Closure Compiler and set the compression options
      '-jar', path.join(__dirname, 'vendor', 'closure-compiler', 'compiler.jar'),
      '--compilation_level=ADVANCED_OPTIMIZATIONS',
      '--language_in=ECMASCRIPT5_STRICT',
      '--warning_level=QUIET'
    ]);

    // explicitly set the encoding of the output and error streams
    compiler.stdout.setEncoding('utf8');
    compiler.stderr.setEncoding('utf8');

    compiler.stdout.on('data', function(data) {
      stdout += data;
    });

    compiler.stderr.on('data', function(data) {
      stderr += data;
    });

    compiler.on('exit', function(status) {
      var exception = null;
      if (status) {
        exception = new Error(stderr);
        exception.status = status;
      }
      callback(exception, stdout);
    });

    // proxy the source string to Closure Compiler
    compiler.stdin.end(source);
  }

  /**
   * Compresses a `source` string using the Unix `gzip` commands. Yields the
   * result, and any exceptions encountered, to a `callback` function.
   *
   * @private
   * @param {String} source The JavaScript source to gzip.
   * @param {Function} callback The function called when gzipping is complete.
   */
  function gzip(source, callback) {
    var compressor = spawn('gzip', ['-9f', '-c']),
        stderr = '',
        stdout = '';

    compressor.stdout.setEncoding('binary');
    compressor.stderr.setEncoding('utf8');

    compressor.stdout.on('data', function(data) {
      stdout += data;
    });

    compressor.stderr.on('data', function(data) {
      stderr += data;
    });

    compressor.on('exit', function(status) {
      var exception = null;
      if (status) {
        exception = new Error(stderr);
        exception.status = status;
      }
      callback(exception, stdout);
    });

    // proxy the source string to the `gzip` executable
    compressor.stdin.end(source);
  }

  /**
   * Compresses a `source` string using UglifyJS. Yields the result to a
   * `callback` function. This function is synchronous; the `callback` is used
   * for symmetry.
   *
   * @private
   * @param {String} source The JavaScript source to minify.
   * @param {Function} callback The function called when minifying is complete.
   */
  function uglify(source, callback) {
    var ugly = uglifyJS.uglify;

    var result = ugly.gen_code(
      // enable unsafe transformations.
      ugly.ast_squeeze_more(
        ugly.ast_squeeze(
          // munge variable and function names, excluding the special `define`
          // function exposed by AMD loaders.
          ugly.ast_mangle(uglifyJS.parser.parse(source), {
            'except': ['define']
          }
      ))), {
      'ascii_only': true
    });

    // split lines at 500 characters to be consistent with Closure Compiler
    callback(ugly.split_lines(result, 500));
  }

  /*--------------------------------------------------------------------------*/

  // create the destination directory if it doesn't exist
  if (!path.existsSync(distPath)) {
    fs.mkdirSync(distPath);
  }

  // compress and `gzip` Lo-Dash using the Closure Compiler
  compile(source, function(exception, result) {
    if (exception) {
      throw exception;
    }
    // post-process the minified source
    var source = postprocess(result);

    // save the final minified version
    fs.writeFileSync(path.join(distPath, 'lodash.compiler.js'), source);

    // save the `gzip`-ed version
    gzip(source, function(exception, result) {
      if (exception) {
        throw exception;
      }
      // explicit `binary` encoding is necessary to ensure that the stream is written correctly
      fs.writeFileSync(path.join(distPath, 'lodash.compiler.js.gz'), result, 'binary');
    });
  });

  // compress and `gzip` Lo-Dash using UglifyJS
  uglify(source, function(result) {
    var source = postprocess(result);
    fs.writeFileSync(path.join(distPath, 'lodash.uglify.js'), source);
    gzip(source, function(exception, result) {
      if (exception) {
        throw exception;
      }
      fs.writeFileSync(path.join(distPath, 'lodash.uglify.js.gz'), result, 'binary');
    });
  });
}());
