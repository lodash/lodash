'use strict';

const _ = require('lodash');
const async = require('async');
const path = require('path');
const webpack = require('webpack');

const file = require('../common/file');
const util = require('../common/util');

const basePath = path.join(__dirname, '..', '..');
const distPath = path.join(basePath, 'dist');
const fpPath = path.join(basePath, 'fp');
const filename = 'lodash.fp.js';

const fpConfig = {
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

const mappingConfig = {
  'entry': path.join(fpPath, '_mapping.js'),
  'output': {
    'path': distPath,
    'filename': 'mapping.fp.js',
    'library': 'mapping',
    'libraryTarget': 'umd'
  }
};

/*----------------------------------------------------------------------------*/

/**
 * Creates browser builds of the FP converter and mappings at the `target` path.
 *
 * @private
 * @param {string} target The output directory path.
 */
function build() {
  async.series([
    _.partial(webpack, mappingConfig),
    _.partial(webpack, fpConfig),
    file.min(path.join(distPath, filename))
  ], util.pitch);
}

build();
