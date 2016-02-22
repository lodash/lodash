'use strict';

var _ = require('lodash'),
    async = require('async'),
    path = require('path');

var util = require('../common/util');

var basePath = path.join(__dirname, '..', '..'),
    distPath = path.join(basePath, 'dist');

var filePairs = [
  [path.join(distPath, 'lodash.core.js'), 'core.js'],
  [path.join(distPath, 'lodash.core.min.js'), 'core.min.js'],
  [path.join(distPath, 'lodash.min.js'), 'lodash.min.js']
];

/*----------------------------------------------------------------------------*/

function onComplete(error) {
  if (error) {
    throw error;
  }
}

function build(target) {
  var actions = _.map(filePairs, function(pair) {
    return util.copyFile(pair[0], path.join(target, pair[1]));
  });

  async.series(actions, onComplete);
}

build(_.last(process.argv));
