#!/usr/bin/env node
;(function() {
  'use strict';

  /** The Node filesystem module */
  var fs = require('fs');

  /** The minimal license/copyright template */
  var licenseTemplate =
    '/*!\n' +
    ' Lo-Dash @VERSION github.com/bestiejs/lodash/blob/master/LICENSE.txt\n' +
    ' Underscore.js 1.3.3 github.com/documentcloud/underscore/blob/master/LICENSE\n' +
    '*/';

  /*--------------------------------------------------------------------------*/

  /**
   * Post-process a given minified JavaScript `source`, preparing it for
   * deployment.
   *
   * @private
   * @param {String} source The source to process.
   * @returns {String} Returns the processed source.
   */
  function postprocess(source) {
    // set the version
    var license = licenseTemplate.replace('@VERSION', (/VERSION:([\'"])(.*?)\1/).exec(source).pop());
    // move vars exposed by Closure Compiler into the IIFE
    source = source.replace(/^([^(\n]+)\s*(\(function[^)]+\){)/, '$2$1');
    // use double quotes consistently
    source = source.replace(/'use strict'/, '"use strict"');
    // add license
    return license + '\n;' + source;
  }

  /*--------------------------------------------------------------------------*/

  // expose `postprocess`
  if (module != require.main) {
    module.exports = postprocess;
  } else {
    // read the JavaScript source file from the first argument if the script
    // was invoked directly (e.g. `node post-compile.js source.js`) and write to
    // the same file
    (function() {
      var source = fs.readFileSync(process.argv[2], 'utf8');
      fs.writeFileSync(process.argv[2], postprocess(source), 'utf8');
    }());
  }
}());
