'use strict';

var _ = require('lodash'),
    fs = require('fs-extra'),
    glob = require('glob'),
    path = require('path');

/*----------------------------------------------------------------------------*/

function globTemplate(pattern) {
  return _.transform(glob.sync(pattern), function(result, filePath) {
    var key = path.basename(filePath, path.extname(filePath));
    result[key] = _.template(fs.readFileSync(filePath, 'utf8'));
  }, {});
}

module.exports = {
  'globTemplate': globTemplate
};
