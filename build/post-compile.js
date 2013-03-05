#!/usr/bin/env node
;(function() {
  'use strict';

  /** The Node.js filesystem module */
  var fs = require('fs');

  /** The minimal license/copyright template */
  var licenseTemplate = [
    '/**',
    ' * @license',
    ' * Lo-Dash <%= VERSION %> lodash.com/license',
    ' * Underscore.js 1.4.4 underscorejs.org/LICENSE',
    ' */'
  ].join('\n');

  /*--------------------------------------------------------------------------*/

  /**
   * Post-process a given minified Lo-Dash `source`, preparing it for
   * deployment.
   *
   * @param {String} source The source to process.
   * @returns {String} Returns the processed source.
   */
  function postprocess(source) {
    // remove copyright header
    source = source.replace(/^\/\**[\s\S]+?\*\/\n/, '');

    // correct overly aggressive Closure Compiler advanced optimizations
    source = source
      .replace(/prototype\s*=\s*{\s*valueOf\s*:\s*1\s*}/, 'prototype={valueOf:1,y:1}')
      .replace(/(document[^&]+&&)\s*(?:\w+|!\d)/, '$1!({toString:0}+"")')

    source = source.replace(/(\w+\.prototype\s*=\s*)\w+(?=\.prototype;)/, function(match, left) {
      return left + /\w+(?=\.VERSION)/.exec(source);
    });

    // flip `typeof` expressions to help optimize Safari and
    // correct the AMD module definition for AMD build optimizers
    // (e.g. from `"number" == typeof x` to `typeof x == "number")
    source = source.replace(/(\w)?("[^"]+")\s*([!=]=)\s*(typeof(?:\s*\([^)]+\)|\s+[.\w]+(?!\[)))/g, function(match, other, type, equality, expression) {
      return (other ? other + ' ' : '') + expression + equality + type;
    });

    // add trailing semicolon
    if (source) {
      source = source.replace(/[\s;]*?(\s*\/\/.*\s*|\s*\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\/\s*)*$/, ';$1');
    }
    // exit early if version snippet isn't found
    var snippet = /VERSION\s*[=:]\s*([\'"])(.*?)\1/.exec(source);
    if (!snippet) {
      return source;
    }
    // add new copyright header
    var version = snippet[2];
    source = licenseTemplate.replace('<%= VERSION %>', version) + '\n;' + source;

    return source;
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
