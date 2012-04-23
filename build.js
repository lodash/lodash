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

  /*--------------------------------------------------------------------------*/

  // create the destination directory if it doesn't exist
  if (!path.existsSync(distPath)) {
    fs.mkdirSync(distPath);
  }

  // compress and `gzip` Lo-Dash using the Closure Compiler
  compile(source, function(exception, compiledSource) {
    if (exception) {
      throw exception;
    }

    // post-process the compiled source
    compiledSource = postprocess(compiledSource);

    // save the final compiled version
    fs.writeFileSync(path.join(distPath, 'lodash.compiler.js'), compiledSource);

    // `gzip` the compiled version
    gzip(compiledSource, function gzipCompiled(exception, result) {
      if (exception) {
        throw exception;
      }

      // record the size of the compiled version
      var compiledSize = result.length;

      // explicit `binary` encoding is necessary to ensure that the stream is written correctly
      fs.writeFileSync(path.join(distPath, 'lodash.compiler.js.gz'), result, 'binary');

      // compress Lo-Dash using UglifyJS
      var ugly = uglifyJS.uglify,
          uglifiedSource = ugly.gen_code(
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

      // post-process the uglified source and split lines at 500 characters for
      // consistency with Closure Compiler
      uglifiedSource = postprocess(ugly.split_lines(uglifiedSource, 500));

      // save the uglified version
      fs.writeFileSync(path.join(distPath, 'lodash.uglify.js'), uglifiedSource);

      // `gzip` the uglified version
      gzip(uglifiedSource, function gzipUglified(exception, result) {
        if (exception) {
          throw exception;
        }
        var uglifiedSize = result.length;
        fs.writeFileSync(path.join(distPath, 'lodash.uglify.js.gz'), result, 'binary');

        // select the smallest minified distribution and use it as the official
        // minified release
        fs.writeFileSync(path.join(__dirname, "lodash.min.js"), compiledSize < uglifiedSize ? compiledSource : uglifiedSource);
      });
    });
  });
}());
