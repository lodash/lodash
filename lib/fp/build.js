'use strict';

var _ = require('lodash'),
    async = require('async'),
    fs = require('fs-extra'),
    path = require('path'),
    webpack = require('webpack');

var minify = require('../common/minify.js');

var basePath = path.join(__dirname, '..', '..'),
    distPath = path.join(basePath, 'dist'),
    entryPath = path.join(__dirname, 'bower.js'),
    filename = 'lodash.fp.js';

var webpackConfig = {
  'entry': entryPath,
  'output': {
    'path': distPath,
    'filename': filename,
    'library': 'fp',
    'libraryTarget': 'umd'
  },
  'plugins': [
    new webpack.optimize.OccurenceOrderPlugin,
    new webpack.optimize.DedupePlugin
  ]
};

/*----------------------------------------------------------------------------*/

function onComplete(error) {
  if (error) {
    throw error;
  }
}

async.series([
  _.partial(webpack, webpackConfig),
  _.partial(minify, path.join(distPath, filename))
], onComplete);
