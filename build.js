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
    // the process instance and its standard output and error streams
    var process = spawn(name, parameters),
        results = '', error = '';

    if (typeof encoding == 'string' && callback != null) {
      // explicitly set the encoding of the output stream if one is specified
      process.stdout.setEncoding(encoding);
    } else {
      callback = encoding;
      encoding = null;
    }

    process.stdout.on('data', function onData(data) {
      // append the compiled source to the output stream
      results += data;
    });

    process.stderr.on('data', function onError(data) {
      // append the error message to the error stream
      error += data;
    });

    process.on('exit', function onExit(status) {
      var exception = null;
      // `status` contains the process exit code
      if (status) {
        exception = new Error(error);
        exception.status = status;
      }
      callback(exception, results);
    });

    // proxy the standard input to the process
    process.stdin.end(source);
  }

  /*--------------------------------------------------------------------------*/

  // create the destination directory if it doesn't exist
  if (!path.existsSync(distPath)) {
    fs.mkdirSync(distPath);
  }

  // compress and `gzip` Lo-Dash using the Closure Compiler
  console.log('Compressing Lodash using the Closure Compiler...');
  invoke('java', ['-jar', path.join(__dirname, 'vendor', 'closure-compiler', 'compiler.jar'), '--compilation_level=ADVANCED_OPTIMIZATIONS', '--language_in=ECMASCRIPT5_STRICT', '--warning_level=QUIET'], source, function onClosureCompile(exception, compiledSource) {
    if (exception) {
      throw exception;
    }

    // post-process and `gzip` the compiled distribution
    compiledSource = postprocess(compiledSource);
    invoke('gzip', ['-9f', '-c'], compiledSource, 'binary', function onClosureCompress(exception, compiledGzippedSource) {
      var compiledSize, ugly, uglifiedSource;
      if (exception) {
        throw exception;
      }

      // store and print the `gzip`-ped size of the compiled distribution
      compiledSize = compiledGzippedSource.length;
      console.log('Done. Size: %d KB.', compiledSize);

      // compress Lo-Dash using UglifyJS
      console.log('Compressing Lodash using UglifyJS...');
      ugly = uglifyJS.uglify;

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

      // post-process and `gzip` the uglified distribution. Lines are
      // restricted to 500 characters for consistency with Closure Compiler.
      uglifiedSource = postprocess(ugly.split_lines(uglifiedSource, 500));
      invoke('gzip', ['-9f', '-c'], uglifiedSource, 'binary', function onUglifyCompress(exception, uglifiedGzippedSource) {
        var uglifiedSize;
        if (exception) {
          throw exception;
        }

        // store and print the `gzip`-ped size of the uglified distribution
        uglifiedSize = uglifiedGzippedSource.length;
        console.log('Done. Size: %d KB.', uglifiedSize);

        // save the compiled version to disk. The explicit `binary`
        // encoding for the `gzip`-ped version is necessary to ensure that
        // the stream is written correctly.
        fs.writeFileSync(path.join(distPath, 'lodash.compiler.js'), compiledSource);
        fs.writeFileSync(path.join(distPath, 'lodash.compiler.js.gz'), compiledGzippedSource, 'binary');

        // save the uglified version to disk.
        fs.writeFileSync(path.join(distPath, 'lodash.uglify.js'), uglifiedSource);
        fs.writeFileSync(path.join(distPath, 'lodash.uglify.js.gz'), uglifiedGzippedSource, 'binary');

        // select the smallest minified distribution and use it as the
        // official minified release. If they are equivalent, the compiled
        // distribution is used.
        fs.writeFileSync(path.join(__dirname, 'lodash.min.js'), compiledSize < uglifiedSize ? compiledSource : uglifiedSource);
      });
    });
  });
}());
