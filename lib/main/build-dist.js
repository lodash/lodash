'use strict';

var _ = require('lodash'),
    async = require('async'),
    path = require('path');

var util = require('../common/util');

var basePath = path.join(__dirname, '..', '..'),
    distPath = path.join(basePath, 'dist'),
    filename = 'lodash.js';

var baseLodash = path.join(basePath, filename),
    distLodash = path.join(distPath, filename);

/*----------------------------------------------------------------------------*/

function onComplete(error) {
  if (error) {
    throw error;
  }
}

function build() {
  async.series([
    util.copyFile(baseLodash, distLodash),
    util.minFile(distLodash)
  ], onComplete);
}

build();
