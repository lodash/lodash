#!/usr/bin/env node
;(function() {
  'use strict';

  /** The Node filesystem, path, `zlib`, and child process modules */
  var fs = require('fs'),
      gzip = require('zlib').gzip,
      path = require('path'),
      spawn = require('child_process').spawn;

  /** The directory that is the base of the repository */
  var basePath = path.join(__dirname, '../');

  /** The directory where the Closure Compiler is located */
  var closurePath = path.join(basePath, 'vendor', 'closure-compiler', 'compiler.jar');

  /** The distribution directory */
  var distPath = path.join(basePath, 'dist');

  /** Load other modules */
  var preprocess = require(path.join(__dirname, 'pre-compile')),
      postprocess = require(path.join(__dirname, 'post-compile')),
      uglifyJS = require(path.join(basePath, 'vendor', 'uglifyjs', 'uglify-js'));

  /** Closure Compiler command-line options */
  var closureOptions = [
    '--compilation_level=ADVANCED_OPTIMIZATIONS',
    '--language_in=ECMASCRIPT5_STRICT',
    '--warning_level=QUIET'
  ];

  /** Reassign `existsSync` for older versions of Node */
  fs.existsSync || (fs.existsSync = path.existsSync);

  /*--------------------------------------------------------------------------*/

  /**
   * The exposed `minify` function minifies a given Lo-Dash `source` and invokes
   * the `onComplete` callback when finished.
   *
   * @param {String} source The source to minify.
   * @param {String} workingName The name to give temporary files creates during the minification process.
   * @param {Function} onComplete A function called when minification has completed.
   */
  function minify(source, workingName, onComplete) {
    new Minify(source, workingName, onComplete);
  }

  /**
   * The Minify constructor used to keep state of each `minify` invocation.
   *
   * @private
   * @constructor
   * @param {String} source The source to minify.
   * @param {String} workingName The name to give temporary files creates during the minification process.
   * @param {Function} onComplete A function called when minification has completed.
   */
  function Minify(source, workingName, onComplete) {
    // create the destination directory if it doesn't exist
    if (!fs.existsSync(distPath)) {
      // avoid errors when called as a npm executable
      try {
        fs.mkdirSync(distPath);
      } catch(e) { }
    }

    this.compiled = {};
    this.hybrid = {};
    this.uglified = {};
    this.onComplete = onComplete;
    this.source = source = preprocess(source);
    this.workingName = workingName;

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
    // the standard error stream, standard output stream, and Closure Compiler process
    var error = '',
        output = '',
        compiler = spawn('java', ['-jar', closurePath].concat(closureOptions));

    // juggle arguments
    if (typeof message == 'function') {
      callback = message;
      message = null;
    }

    console.log(message == null
      ? 'Compressing ' + this.workingName + ' using the Closure Compiler...'
      : message
    );

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

    console.log(message == null
      ? 'Compressing ' + this.workingName + ' using UglifyJS...'
      : message
    );

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
    gzip(result, onClosureGzip.bind(this));
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
    this.compiled.gzip = result;
    console.log('Done. Size: %d bytes.', result.length);

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
    var message = 'Compressing  ' + this.workingName + ' using hybrid minification...';

    // store the gzipped result and report the size
    this.uglified.gzip = result;
    console.log('Done. Size: %d bytes.', result.length);

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
    gzip(result, onHybridGzip.bind(this));
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
    this.hybrid.gzip = result;
    console.log('Done. Size: %d bytes.', result.length);

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
        name = this.workingName,
        uglified = this.uglified;

    // avoid errors when called as a npm executable
    try {
      // save the Closure Compiled version to disk
      fs.writeFileSync(path.join(distPath, name + '.compiler.js'), compiled.source);
      fs.writeFileSync(path.join(distPath, name + '.compiler.js.gz'), compiled.gzip);

      // save the Uglified version to disk
      fs.writeFileSync(path.join(distPath, name + '.uglify.js'), uglified.source);
      fs.writeFileSync(path.join(distPath, name + '.uglify.js.gz'), uglified.gzip);

      // save the hybrid minified version to disk
      fs.writeFileSync(path.join(distPath, name + '.hybrid.js'), hybrid.source);
      fs.writeFileSync(path.join(distPath, name + '.hybrid.js.gz'), hybrid.gzip);
    } catch(e) { }

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
      var filePath = process.argv[2],
          dirPath = path.dirname(filePath),
          source = fs.readFileSync(filePath, 'utf8'),
          workingName = path.basename(filePath, '.js') + '.min';

      minify(source, workingName, function(result) {
        fs.writeFileSync(path.join(dirPath, workingName + '.js'), result, 'utf8');
      });
    }());
  }
}());
