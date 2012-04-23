#!/usr/bin/env node

;(function () {
  /* Load the Node file system, path, and child process modules. */
  var fs = require("fs"), path = require("path"), spawn = require("child_process").spawn,

  /* Load the UglifyJS compressor. */
  uglifyJS = require(path.join(__dirname, "vendor", "uglifyjs", "uglify-js")),

  /* The distribution directory. */
  distribution = path.join(__dirname, "dist"),

  /* The pre-processed Lodash source. */
  source = preprocess(fs.readFileSync(path.join(__dirname, "lodash.js"), "utf8"));

  /* Create the destination directory if it doesn't exist. */
  if (!path.existsSync(distribution)) {
    fs.mkdirSync(distribution);
  }

  /* Compress and `gzip` Lodash using the Closure Compiler. */
  compile(source, function (exception, results) {
    if (exception) {
      throw exception;
    }
    // Post-process the minified source.
    var source = postprocess(results);
    // Save the final minified version.
    fs.writeFileSync(path.join(distribution, "lodash.compiler.js"), source);
    gzip(source, function (exception, results) {
      if (exception) {
        throw exception;
      }
      // Save the `gzip`-ed version. The explicit `binary` encoding is
      // necessary to ensure that the stream is written correctly.
      fs.writeFileSync(path.join(distribution, "lodash.compiler.js.gz"), results, "binary");
    });
  });

  /* Compress and `gzip` Lodash using UglifyJS. */
  uglify(source, function (results) {
    var source = postprocess(results);
    fs.writeFileSync(path.join(distribution, "lodash.uglify.js"), source);
    gzip(source, function (exception, results) {
      if (exception) {
        throw exception;
      }
      fs.writeFileSync(path.join(distribution, "lodash.uglify.js.gz"), results, "binary");
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
            "except": ["define"]
          }
      ))), {
      "ascii_only": true
    });
    callback(uglifyJS.uglify.split_lines(results, 500));
  }

  /* Compresses a `source` string using the Closure Compiler. Yields the
   * minified result to a `callback` function.
  */
  function compile(source, callback) {
    var compiler = spawn("java", [
      // Load the Closure Compiler and set the compression options.
      "-jar", path.join(__dirname, "vendor", "closure-compiler", "compiler.jar"),
      "--compilation_level=ADVANCED_OPTIMIZATIONS",
      "--language_in=ECMASCRIPT5_STRICT",
      "--warning_level=QUIET"
    ]), stdout = "", stderr = "";
    // Explicitly set the encoding of the output and error streams.
    compiler.stdout.setEncoding("utf8");
    compiler.stderr.setEncoding("utf8");
    compiler.stdout.on("data", function (data) {
      stdout += data;
    });
    compiler.stderr.on("data", function (data) {
      stderr += data;
    });
    compiler.on("exit", function (status) {
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
    var compressor = spawn("gzip", ["-9f", "-c"]), stdout = "", stderr = "";
    compressor.stdout.setEncoding("binary");
    compressor.stderr.setEncoding("utf8");
    compressor.stdout.on("data", function (data) {
      stdout += data;
    });
    compressor.stderr.on("data", function (data) {
      stderr += data;
    });
    compressor.on("exit", function (status) {
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

  /* Post-processes a compressed `source` string. */
  function postprocess(source) {
    /** The minimal license/copyright header */
    var license =
      '/*!\n' +
      ' Lo-Dash @VERSION github.com/bestiejs/lodash/blob/master/LICENSE.txt\n' +
      ' Underscore.js 1.3.3 github.com/documentcloud/underscore/blob/master/LICENSE\n' +
      '*/';

    /*--------------------------------------------------------------------------*/

    // set the version
    license = license.replace('@VERSION', (/VERSION:([\'"])(.*?)\1/).exec(source).pop());

    // move vars exposed by Closure Compiler into the IIFE
    source = source.replace(/^([^(\n]+)\s*(\(function[^)]+\){)/, '$2$1');

    // use double quotes consistently
    source = source.replace(/'use strict'/, '"use strict"');

    // add license
    return license + '\n;' + source;
  }

  /* Pre-processes an uncompressed `source` string. */
  function preprocess(source) {
    /** Used to minify variables embedded in compiled strings */
    var compiledVars = [
      'accumulator',
      'array',
      'arrayClass',
      'bind',
      'callback',
      'className',
      'collection',
      'computed',
      'concat',
      'current',
      'false',
      'funcClass',
      'hasOwnProperty',
      'identity',
      'index',
      'indexOf',
      'Infinity',
      'initial',
      'isArray',
      'isEmpty',
      'length',
      'object',
      'Math',
      'property',
      'result',
      'slice',
      'source',
      'stringClass',
      'target',
      'thisArg',
      'toString',
      'true',
      'undefined',
      'value',
      'values'
    ];

    /** Used to minify string values embedded in compiled strings */
    var compiledValues = [
      'arrays',
      'objects'
    ];

    /** Used to minify `iterationFactory` option properties */
    var iterationFactoryOptions = [
      'afterLoop',
      'args',
      'array',
      'beforeLoop',
      'bottom',
      'exits',
      'inLoop',
      'init',
      'iterate',
      'loopExp',
      'object',
      'returns',
      'top',
      'useHas'
    ];

    /** Used to minify variables and string values to a single character */
    var minNames = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    /** Used protect the specified properties from getting minified */
    var propWhitelist = [
      '_',
      'amd',
      'chain',
      'clearInterval',
      'criteria',
      'escape',
      'evaluate',
      'interpolate',
      'isEqual',
      'isFinite',
      'lodash',
      'setTimeout',
      'templateSettings',
      'toArray',
      'value',
      'variable'
    ];

    /*--------------------------------------------------------------------------*/

    /**
     * Remove copyright to add later in post-compile.js
     */
    source = source.replace(/\/\*![\s\S]+?\*\//, '');

    /**
     * Correct JSDoc tags for Closure Compiler.
     */
    source = source.replace(/@(?:alias|category)[^\n]*/g, '');

    /**
     * Add brackets to whitelisted properties so Closure Compiler won't mung them.
     * http://code.google.com/closure/compiler/docs/api-tutorial3.html#export
     */
    source = source.replace(RegExp('\\.(' + iterationFactoryOptions.concat(propWhitelist).join('|') + ')\\b', 'g'), "['$1']");

    /**
     * Minify `sortBy` and `template` methods.
     */
    ['sortBy', 'template'].forEach(function(methodName) {
      var properties = ['criteria', 'value'],
          snippet = source.match(RegExp('(\\n\\s*)function ' + methodName + '[\\s\\S]+?\\1}'))[0],
          result = snippet;

      // minify property strings
      properties.forEach(function(property, index) {
        result = result.replace(RegExp("'" + property + "'", 'g'), "'" + minNames[index] + "'");
      });

      // remove escaped newlines in strings
      result = result.replace(/\\n/g, '');

      // replace with modified snippet
      source = source.replace(snippet, result);
    });

    /*--------------------------------------------------------------------------*/

    /**
     * Minify all `iterationFactory` related snippets.
     */
    source.match(
      RegExp([
        // match variables storing `iterationFactory` options
        'var [a-zA-Z]+FactoryOptions\\s*=\\s*\\{[\\s\\S]+?};\\n',
        // match the the `iterationFactory` function
        '(\\n\\s*)function iterationFactory[\\s\\S]+?\\1}',
        // match methods created by `iterationFactor` calls
        'iterationFactory\\((?:[\'{]|[a-zA-Z]+,)[\\s\\S]+?\\);\\n'
      ].join('|'), 'g')
    )
    .forEach(function(snippet, index) {
      var result = snippet;

      // add `true` and `false` arguments to be minified
      if (/function iterationFactory/.test(snippet)) {
        result = result
          .replace(/(Function\('[\s\S]+?)undefined/, '$1true,false,undefined')
          .replace(/\)\([^)]+/, '$&,true,false');

        // replace with modified snippet early and clip snippet
        source = source.replace(snippet, result);
        snippet = result = result.replace(/\)\([\s\S]+$/, '');
      }

      // minify snippet variables/arguments
      compiledVars.forEach(function(variable, index) {
        result = result.replace(RegExp('([^.]\\b|\\\\n)' + variable + '\\b(?!\'\\s*[\\]:])', 'g'), '$1' + minNames[index]);
        // correct `typeof x == 'object'`
        if (variable == 'object') {
          result = result.replace(RegExp("(typeof [^']+')" + minNames[index] + "'", 'g'), "$1object'");
        }
        // correct boolean literals
        if (variable == 'true' || variable == 'false') {
          result = result
            .replace(RegExp(':\\s*' + minNames[index] + '\\s*,', 'g'), ':' + variable + ',')
            .replace(RegExp('\\s*' + minNames[index] + '\\s*;', 'g'), variable + ';');
        }
      });

      // minify snippet values
      compiledValues.forEach(function(value, index) {
        result = result.replace(RegExp("'" + value + "'", 'g'), "'" + minNames[index] + "'");
      });

      // minify iterationFactory option property strings
      iterationFactoryOptions.forEach(function(property, index) {
        if (property == 'array' || property == 'object') {
          result = result.replace(RegExp("'" + property + "'(\\s*[\\]:])", 'g'), "'" + minNames[index] + "'$1");
        } else {
          result = result.replace(RegExp("'" + property + "'", 'g'), "'" + minNames[index] + "'");
        }
      });

      // remove escaped newlines in strings
      result = result.replace(/\\n/g, '');

      // replace with modified snippet
      source = source.replace(snippet, result);
    });

    /*--------------------------------------------------------------------------*/

    // write to the same file
    return source;
  }
}());