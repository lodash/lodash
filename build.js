#!/usr/bin/env node
;(function() {
  'use strict';

  /** The Node filesystem and path modules */
  var fs = require('fs'),
      path = require('path');

  /** The build directory containing the build scripts */
  var buildPath = path.join(__dirname, 'build');

  /** The minify module */
  var Minify = require(path.join(buildPath, 'minify'));

  /** The lodash.js source */
  var source = fs.readFileSync(path.join(__dirname, 'lodash.js'), 'utf8');

  /*--------------------------------------------------------------------------*/

  // begin the minification process
  new Minify(source, 'lodash.min', function(result) {
    fs.writeFileSync(path.join(__dirname, 'lodash.min.js'), result);
  });
}());
