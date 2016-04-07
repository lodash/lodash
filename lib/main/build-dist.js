'use strict';

var _ = require('lodash'),
    async = require('async'),
    path = require('path');

var file = require('../common/file');

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
    file.copy(baseLodash, distLodash),
    file.min(distLodash)
  ], onComplete);
}

build();
