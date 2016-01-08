'use strict';

var _ = require('lodash'),
    fs = require('fs-extra'),
    uglify = require('uglify-js');

var uglifyOptions = require('./uglify.options.js');

/*----------------------------------------------------------------------------*/

function minify(inpath, outpath, callback, options) {
  if (_.isFunction(outpath)) {
    if (_.isObject(callback)) {
      options = callback;
    }
    callback = outpath;
    outpath = undefined;
  }
  if (!outpath) {
    outpath = inpath.replace(/(?=\.js$)/, '.min');
  }
  var output = uglify.minify(inpath, _.defaults(options || {}, uglifyOptions));
  fs.writeFile(outpath, output.code, 'utf-8', callback);
}

module.exports = minify;
