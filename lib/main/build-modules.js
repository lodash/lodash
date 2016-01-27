'use strict';

var _ = require('lodash'),
    fs = require('fs-extra'),
    path = require('path');

var basePath = path.join(__dirname, '..', '..'),
    distPath = path.join(basePath, 'dist'),
    corePath = path.join(distPath, 'lodash.core.js');

/*----------------------------------------------------------------------------*/

function onComplete(error) {
  if (error) {
    throw error;
  }
}

function build(target) {
  fs.copy(corePath, path.join(target, 'core.js'), onComplete);
}

build(_.last(process.argv));
