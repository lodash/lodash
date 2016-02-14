'use strict';

var _ = require('lodash'),
    fs = require('fs-extra'),
    glob = require('glob'),
    path = require('path');

/*----------------------------------------------------------------------------*/

function globTemplate(pattern) {
  return _.transform(glob.sync(pattern), function(result, filePath) {
    result[path.basename(filePath, path.extname(filePath))] = _.template(fs.readFileSync(filePath));
  }, {});
}

module.exports = {
  'globTemplate': globTemplate
};
