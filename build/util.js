#!/usr/bin/env node
;(function() {
  'use strict';

  /** Load Node.js modules */
  var fs = require('fs'),
      path = require('path');

  /** Load other modules */
  var _ = require('../lodash.js');

  /** Used to indicate if running in Windows */
  var isWindows = process.platform == 'win32';

  /*--------------------------------------------------------------------------*/

  /**
   * The path separator.
   *
   * @memberOf util.path
   * @type string
   */
  var sep = path.sep || (isWindows ? '\\' : '/');

  /**
   * The escaped path separator used for inclusion in RegExp strings.
   *
   * @memberOf util.path
   * @type string
   */
  var sepEscaped = sep.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  /** Used to determine if a path is prefixed with a drive letter, dot, or slash */
  var rePrefixed = RegExp('^(?:' + (isWindows ? '[a-zA-Z]:|' : '') + '\\.?)' + sepEscaped);

  /*--------------------------------------------------------------------------*/

  /**
   * Makes the given `dirname` directory, without throwing errors for existing
   * directories and making parent directories as needed.
   *
   * @memberOf util.fs
   * @param {string} dirname The path of the directory.
   * @param {(number|string)} [mode='0777'] The permission mode.
   */
  function mkdirpSync(dirname, mode) {
    // ensure relative paths are prefixed with `./`
    if (!rePrefixed.test(dirname)) {
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
   * @type object
   */
  var util = {

   /**
    * The file system object.
    *
    * @memberOf util
    * @type object
    */
    'fs': _.defaults(_.cloneDeep(fs), {
      'existsSync': fs.existsSync || path.existsSync,
      'mkdirpSync': mkdirpSync
    }),

   /**
    * The path object.
    *
    * @memberOf util
    * @type object
    */
    'path': _.defaults(_.cloneDeep(path), {
      'sep': sep,
      'sepEscaped': sepEscaped
    })
  };

  /*--------------------------------------------------------------------------*/

  // expose
  module.exports = util;
}());
