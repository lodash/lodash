#!/usr/bin/env node
;(function() {
  'use strict';

  /* Post-processes a compressed `src` string. */
  var postprocess = module.exports = function postprocess(src) {
    /** The minimal license/copyright header */
    var license =
      '/*!\n' +
      ' Lo-Dash @VERSION github.com/bestiejs/lodash/blob/master/LICENSE.txt\n' +
      ' Underscore.js 1.3.3 github.com/documentcloud/underscore/blob/master/LICENSE\n' +
      '*/';

    /*--------------------------------------------------------------------------*/

    // set the version
    license = license.replace('@VERSION', (/VERSION:([\'"])(.*?)\1/).exec(src).pop());

    // move vars exposed by Closure Compiler into the IIFE
    src = src.replace(/^([^(\n]+)\s*(\(function[^)]+\){)/, '$2$1');

    // use double quotes consistently
    src = src.replace(/'use strict'/, '"use strict"');

    // add license
    return license + '\n;' + src;
  };

  /*--------------------------------------------------------------------------*/

  /** The filesystem module */
  var fs = require('fs'), src;

  if (module == require.main) {
    // read the JavaScript source file from the first argument if the script
    // was invoked directly (i.e., `node post-compile.js source.js`)
    src = fs.readFileSync(process.argv[2], 'utf8');

    // write to the same file
    fs.writeFileSync(process.argv[2], postprocess(src), 'utf8');
  }
}());