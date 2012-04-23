#!/usr/bin/env node

;(function () {
  'use strict';

  /* Load the Node file system, path, and child process modules. */
  var fs = require('fs'), path = require('path'), spawn = require('child_process').spawn,

  /* Load the UglifyJS compressor. */
  uglifyJS = require(path.join(__dirname, 'vendor', 'uglifyjs', 'uglify-js')),
  
  /* The `build` directory, containing the build scripts. */
  buildPath = path.join(__dirname, 'build'),
  
  /* The distribution directory. */
  distPath = path.join(__dirname, 'dist'),

  /* Load the pre- and post-processors. */
  preprocess = require(path.join(buildPath, 'pre-compile')),
  postprocess = require(path.join(buildPath, 'post-compile')),

  /* The pre-processed Lodash source. */
  source = preprocess(fs.readFileSync(path.join(__dirname, 'lodash.js'), 'utf8'));

  /* Create the destination directory if it doesn't exist. */
  if (!path.existsSync(distPath)) {
    fs.mkdirSync(distPath);
  }

  /* Compress and `gzip` Lodash using the Closure Compiler. */
  compile(source, function (exception, results) {
    if (exception) {
      throw exception;
    }
    // Post-process the minified source.
    var source = postprocess(results);
    // Save the final minified version.
    fs.writeFileSync(path.join(distPath, 'lodash.compiler.js'), source);
    gzip(source, function (exception, results) {
      if (exception) {
        throw exception;
      }
      // Save the `gzip`-ed version. The explicit `binary` encoding is
      // necessary to ensure that the stream is written correctly.
      fs.writeFileSync(path.join(distPath, 'lodash.compiler.js.gz'), results, 'binary');
    });
  });

  /* Compress and `gzip` Lodash using UglifyJS. */
  uglify(source, function (results) {
    var source = postprocess(results);
    fs.writeFileSync(path.join(distPath, 'lodash.uglify.js'), source);
    gzip(source, function (exception, results) {
      if (exception) {
        throw exception;
      }
      fs.writeFileSync(path.join(distPath, 'lodash.uglify.js.gz'), results, 'binary');
    });
  });

  /* Compresses a `source` string using UglifyJS. Yields the result to a
   * `callback` function. This function is synchronous; the `callback` is used
   * for symmetry.
  */
  function uglify(source, callback) {
    var results = uglifyJS.uglify.gen_code(
      // Enable unsafe transformations.
      uglifyJS.uglify.ast_squeeze_more(
        uglifyJS.uglify.ast_squeeze(
          // Munge variable and function names, excluding the special `define`
          // function exposed by asynchronous module loaders.
          uglifyJS.uglify.ast_mangle(uglifyJS.parser.parse(source), {
            'except': ['define']
          }
      ))), {
      'ascii_only': true
    });
    callback(uglifyJS.uglify.split_lines(results, 500));
  }

  /* Compresses a `source` string using the Closure Compiler. Yields the
   * minified result to a `callback` function.
  */
  function compile(source, callback) {
    var compiler = spawn('java', [
      // Load the Closure Compiler and set the compression options.
      '-jar', path.join(__dirname, 'vendor', 'closure-compiler', 'compiler.jar'),
      '--compilation_level=ADVANCED_OPTIMIZATIONS',
      '--language_in=ECMASCRIPT5_STRICT',
      '--warning_level=QUIET'
    ]), stdout = '', stderr = '';
    // Explicitly set the encoding of the output and error streams.
    compiler.stdout.setEncoding('utf8');
    compiler.stderr.setEncoding('utf8');
    compiler.stdout.on('data', function (data) {
      stdout += data;
    });
    compiler.stderr.on('data', function (data) {
      stderr += data;
    });
    compiler.on('exit', function (status) {
      var exception = null;
      if (status) {
        exception = new Error(stderr);
        exception.status = status;
      }
      callback(exception, stdout);
    });
    compiler.stdin.end(source);
  }

  /* Compresses a `source` string using the Unix `gzip` commands. Yields the
   * result, and any exceptions encountered, to a `callback` function.
  */
  function gzip(source, callback) {
    var compressor = spawn('gzip', ['-9f', '-c']), stdout = '', stderr = '';
    compressor.stdout.setEncoding('binary');
    compressor.stderr.setEncoding('utf8');
    compressor.stdout.on('data', function (data) {
      stdout += data;
    });
    compressor.stderr.on('data', function (data) {
      stderr += data;
    });
    compressor.on('exit', function (status) {
      var exception = null;
      if (status) {
        exception = new Error(stderr);
        exception.status = status;
      }
      callback(exception, stdout);
    });
    // Proxy the source string to the `gzip` executable.
    compressor.stdin.end(source);
  }
}());