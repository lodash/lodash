#!/usr/bin/env node
;(function() {
  'use strict';

  /** Load Node.js modules */
  var fs = require('fs'),
      path = require('path');

  /** Load other modules */
  var _ = require('../lodash.js');

  /*--------------------------------------------------------------------------*/

  /**
   * The path separator.
   *
   * @memberOf util.path
   * @type String
   */
  var sep = path.sep || (process.platform == 'win32' ? '\\' : '/');

  /**
   * The escaped path separator used for inclusion in RegExp strings.
   *
   * @memberOf util.path
   * @type String
   */
  var sepEscaped = sep.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  /*--------------------------------------------------------------------------*/

  /**
   * Makes the given `dirname` directory, without throwing errors for existing
   * directories and making parent directories as needed.
   *
   * @memberOf util.fs
   * @param {String} dirname The path of the directory.
   * @param {Number|String} [mode='0777'] The permission mode.
   */
  function mkdirpSync(dirname, mode) {
    // ensure relative paths are prefixed with `./`
    if (!RegExp('^\\.?' + sepEscaped).test(dirname)) {
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

  /**
   * The utility object.
   *
   * @type Object
   */
  var util = {

   /**
    * The file system object.
    *
    * @memberOf util
    * @type Object
    */
    'fs': _.defaults({}, fs, {
      'existsSync': fs.existsSync || path.existsSync,
      'mkdirpSync': mkdirpSync
    }),

   /**
    * The path object.
    *
    * @memberOf util
    * @type Object
    */
    'path': _.defaults({}, path, {
      'sep': sep,
      'sepEscaped': sepEscaped
    })
  };

  /*--------------------------------------------------------------------------*/

  // expose
  module.exports = util;
}());
