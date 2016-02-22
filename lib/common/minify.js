'use strict';

var _ = require('lodash'),
    fs = require('fs-extra'),
    uglify = require('uglify-js');

var uglifyOptions = require('./uglify.options');

/*----------------------------------------------------------------------------*/

function minify(srcPath, destPath, callback, options) {
  if (_.isFunction(destPath)) {
    if (_.isObject(callback)) {
      options = callback;
    }
    callback = destPath;
    destPath = undefined;
  }
  if (!destPath) {
    destPath = srcPath.replace(/(?=\.js$)/, '.min');
  }
  var output = uglify.minify(srcPath, _.defaults(options || {}, uglifyOptions));
  fs.writeFile(destPath, output.code, 'utf-8', callback);
}

module.exports = minify;
