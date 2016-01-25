'use strict';

var _ = require('lodash'),
    async = require('async'),
    fs = require('fs-extra'),
    path = require('path');

var minify = require('../common/minify.js');

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
    _.partial(fs.copy, baseLodash, distLodash),
    _.partial(minify, distLodash)
  ], onComplete);
}

build();
