'use strict';

var _ = require('lodash'),
    fs = require('fs-extra'),
    glob = require('glob'),
    path = require('path');

var minify = require('../common/minify.js');

/*----------------------------------------------------------------------------*/

function copy(srcPath, destPath) {
  return _.partial(fs.copy, srcPath, destPath);
}

function globTemplate(pattern) {
  return _.transform(glob.sync(pattern), function(result, filePath) {
    var key = path.basename(filePath, path.extname(filePath));
    result[key] = _.template(fs.readFileSync(filePath, 'utf8'));
  }, {});
}

function min(srcPath, destPath) {
  return _.partial(minify, srcPath, destPath);
}

function write(filePath, data) {
  return _.partial(fs.writeFile, filePath, data);
}

module.exports = {
  'copy': copy,
  'globTemplate': globTemplate,
  'min': min,
  'write': write
};
