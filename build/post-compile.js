#!/usr/bin/env node
;(function() {
  'use strict';

  /** The filesystem module */
  var fs = require('fs');

  /** The JavaScript source */
  var src = fs.readFileSync(process.argv[2], 'utf8');

  /** The minimal license/copyright header */
  var license =
    '/*!\n' +
    ' Lo-Dash @VERSION github.com/bestiejs/lodash/blob/master/LICENSE.txt\n' +
    ' Underscore.js 1.3.3 github.com/documentcloud/underscore/blob/master/LICENSE\n' +
    '*/';

  /*--------------------------------------------------------------------------*/

  // set the version
  license = license.replace('@VERSION', /VERSION=([\'"])(.*?)\1/.exec(src).pop());

  // move vars exposed by Closure Compiler into the IIFE
  src = src.replace(/^([^(\n]+)\s*(\(function[^)]+\){)/, '$2$1');

  // use double quotes consistently
  src = src.replace(/'use strict'/, '"use strict"');

  // add license
  src = license + '\n;' + src;

  // write to the same file
  fs.writeFileSync(process.argv[2], src, 'utf8');
}());
