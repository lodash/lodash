#!/usr/bin/env node
;(function() {
  'use strict';

  /** The Node filesystem module */
  var fs = require('fs');

  /** The minimal license/copyright template */
  var licenseTemplate = {
    'lodash':
      '/*!\n' +
      ' Lo-Dash <%= VERSION %> lodash.com/license\n' +
      ' Underscore.js 1.4.3 underscorejs.org/LICENSE\n' +
      '*/',
    'underscore':
      '/*! Underscore.js <%= VERSION %> underscorejs.org/LICENSE */'
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
    // move vars exposed by the Closure Compiler into the IIFE
    source = source.replace(/^((?:(['"])use strict\2;)?(?:var (?:[a-z]+=(?:!0|!1|null)[,;])+)?)([\s\S]*?function[^)]+\){)/, '$3$1');

    // correct overly aggressive Closure Compiler advanced optimizations
    source = source.replace(/prototype\s*=\s*{\s*valueOf\s*:\s*1\s*}/, 'prototype={valueOf:1,y:1}');

    // unescape properties (e.g. foo["bar"] => foo.bar)
    source = source.replace(/(\w)\["([^."]+)"\]/g, function(match, left, right) {
      return /\W/.test(right) ? match : (left + '.' + right);
    });

    // flip `typeof` expressions to help optimize Safari and
    // correct the AMD module definition for AMD build optimizers
    // (e.g. from `"number" == typeof x` to `typeof x == "number")
    source = source.replace(/(return)?("[^"]+")\s*([!=]=)\s*(typeof(?:\s*\([^)]+\)|\s+[\w.]+))/g, function(match, ret, type, equality, expression) {
      return (ret ? ret + ' ' : '') + expression + equality + type;
    });

    // add trailing semicolon
    if (source) {
      source = source.replace(/[\s;]*$/, ';');
    }
    // exit early if version snippet isn't found
    var snippet = /VERSION\s*[=:]\s*([\'"])(.*?)\1/.exec(source);
    if (!snippet) {
      return source;
    }
    // add copyright/license header
    return licenseTemplate[/call\(this\);?$/.test(source) ? 'underscore' : 'lodash']
      .replace('<%= VERSION %>', snippet[2]) + '\n;' + source;
  }

  /*--------------------------------------------------------------------------*/

  // expose `postprocess`
  if (module != require.main) {
    module.exports = postprocess;
  }
  else {
    // read the Lo-Dash source file from the first argument if the script
    // was invoked directly (e.g. `node post-compile.js source.js`) and write to
    // the same file
    (function() {
      var options = process.argv;
      if (options.length < 3) {
        return;
      }
      var filePath = options[options.length - 1],
          source = fs.readFileSync(filePath, 'utf8');

      fs.writeFileSync(filePath, postprocess(source), 'utf8');
    }());
  }
}());
