#!/usr/bin/env node
;(function() {
  'use strict';

  /** The Node filesystem module */
  var fs = require('fs');

  /** The minimal license/copyright template */
  var licenseTemplate = {
    'lodash':
      '/*!\n' +
      ' Lo-Dash @VERSION lodash.com/license\n' +
      ' Underscore.js 1.3.3 github.com/documentcloud/underscore/blob/master/LICENSE\n' +
      '*/',
    'underscore':
      '/*! Underscore.js @VERSION github.com/documentcloud/underscore/blob/master/LICENSE */'
  };

  /*--------------------------------------------------------------------------*/

  /**
   * Post-process a given minified Lo-Dash `source`, preparing it for
   * deployment.
   *
   * @param {String} source The source to process.
   * @returns {String} Returns the processed source.
   */
  function postprocess(source) {
    // move vars exposed by Closure Compiler into the IIFE
    source = source.replace(/^([^(\n]+)\s*(\(function[^)]+\){)/, '$2$1');

    // unescape properties (i.e. foo["bar"] => foo.bar)
    source = source.replace(/(\w)\["([^."]+)"\]/g, function(match, left, right) {
      return /\W/.test(right) ? match : (left + '.' + right);
    });

    // correct AMD module definition for AMD build optimizers
    source = source.replace(/("function")\s*==\s*(typeof define)\s*&&\s*\(?\s*("object")\s*==\s*(typeof define\.amd)\s*&&\s*(define\.amd)\s*\)?/, '$2==$1&&$4==$3&&$5');

    // add trailing semicolon
    if (source) {
      source = source.replace(/[\s;]*$/, ';');
    }
    // exit early if version snippet isn't found
    var snippet = /VERSION\s*[=:]\s*([\'"])(.*?)\1/.exec(source);
    if (!snippet) {
      return source;
    }
    // add license
    return licenseTemplate[/call\(this\);?$/.test(source) ? 'underscore' : 'lodash']
      .replace('@VERSION', snippet[2]) + '\n;' + source;
  }

  /*--------------------------------------------------------------------------*/

  // expose `postprocess`
  if (module != require.main) {
    module.exports = postprocess;
  } else {
    // read the Lo-Dash source file from the first argument if the script
    // was invoked directly (e.g. `node post-compile.js source.js`) and write to
    // the same file
    (function() {
      var source = fs.readFileSync(process.argv[2], 'utf8');
      fs.writeFileSync(process.argv[2], postprocess(source), 'utf8');
    }());
  }
}());
