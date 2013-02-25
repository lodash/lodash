#!/usr/bin/env node
;(function() {
  'use strict';

  /** Load Node.js modules */
  var fs = require('fs'),
      path = require('path');

  /** Add `path.sep` for older versions of Node.js */
  path.sep || (path.sep = process.platform == 'win32' ? '\\' : '/');

  /*--------------------------------------------------------------------------*/

  /**
   * Makes the given `dirname` directory, without throwing errors for existing
   * directories and making parent directories as needed.
   *
   * @param {String} dirname The path of the directory.
   * @param {Number|String} [mode='0777'] The permission mode.
   */
  function mkdirpSync(dirname, mode) {
    var sep = path.sep;

    // ensure relative paths are prefixed with `./`
    if (!RegExp('^\\.?' + sep).test(dirname)) {
      dirname = '.' + sep + dirname;
    }
    dirname.split(sep).reduce(function(currPath, segment) {
      currPath += sep + segment;
      try {
        currPath = fs.realpathSync(currPath);
      } catch(e) {
        fs.mkdirSync(currPath, mode);
      }
      return currPath;
    });
  }

  /*--------------------------------------------------------------------------*/

  // expose
  module.exports = mkdirpSync;
}());
