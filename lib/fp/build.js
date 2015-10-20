'use strict';

var _ = require('lodash'),
    async = require('async'),
    fs = require('fs'),
    path = require('path'),
    uglify = require('uglify-js'),
    webpack = require('webpack');

var entryPath = path.join(__dirname, 'bower.js'),
    outputPath = path.join(__dirname, '..', '..', 'dist'),
    filename = 'lodash.fp.js';

var webpackConfig = {
  'entry': entryPath,
  'output': {
    'path': outputPath,
    'filename': filename,
    'library': 'fp',
    'libraryTarget': 'umd'
  },
  'plugins': [
    new webpack.optimize.OccurenceOrderPlugin,
    new webpack.optimize.DedupePlugin
  ]
}

var uglifyConfig = {
  'mangle': true,
  'compress': {
    'comparisons': false,
    'keep_fargs': true,
    'pure_getters': true,
    'unsafe': true,
    'unsafe_comps': true,
    'warnings': false
  },
  'output': {
    'ascii_only': true,
    'beautify': false,
    'max_line_len': 500
  }
}

/*----------------------------------------------------------------------------*/

function minify(inputPath, callback) {
  var output = uglify.minify(inputPath, uglifyConfig),
      outputPath = inputPath.replace(/(?=\.js$)/, '.min');

  fs.writeFile(outputPath, output.code, 'utf-8', callback);
}

function onComplete(error) {
  if (error) {
    throw error;
  }
}

async.series([
  _.partial(webpack, webpackConfig),
  _.partial(minify, path.join(outputPath, filename))
], onComplete);
