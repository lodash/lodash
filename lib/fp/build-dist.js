'use strict';

var _ = require('lodash'),
    async = require('async'),
    path = require('path'),
    webpack = require('webpack');

var minify = require('../common/minify.js');

var basePath = path.join(__dirname, '..', '..'),
    distPath = path.join(basePath, 'dist'),
    fpPath = path.join(basePath, 'fp'),
    filename = 'lodash.fp.js';

var fpConfig = {
  'entry': path.join(fpPath, '_convertBrowser.js'),
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

var mappingConfig = {
  'entry': path.join(fpPath, '_mapping.js'),
  'output': {
    'path': distPath,
    'filename': 'mapping.fp.js',
    'library': 'mapping',
    'libraryTarget': 'umd'
  }
};

/*----------------------------------------------------------------------------*/

function onComplete(error) {
  if (error) {
    throw error;
  }
}

async.series([
  _.partial(webpack, mappingConfig),
  _.partial(webpack, fpConfig),
  _.partial(minify, path.join(distPath, filename))
], onComplete);
