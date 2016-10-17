'use strict';

const _ = require('lodash');
const async = require('async');
const path = require('path');

const file = require('../common/file');
const util = require('../common/util');

const basePath = path.join(__dirname, '..', '..');
const distPath = path.join(basePath, 'dist');

const filePairs = [
  [path.join(distPath, 'lodash.core.js'), 'core.js'],
  [path.join(distPath, 'lodash.core.min.js'), 'core.min.js'],
  [path.join(distPath, 'lodash.min.js'), 'lodash.min.js']
];

/*----------------------------------------------------------------------------*/

/**
 * Creates supplementary Lodash modules at the `target` path.
 *
 * @private
 * @param {string} target The output directory path.
 */
function build(target) {
  const actions = _.map(filePairs, pair =>
    file.copy(pair[0], path.join(target, pair[1])));

  async.series(actions, util.pitch);
}

build(_.last(process.argv));
