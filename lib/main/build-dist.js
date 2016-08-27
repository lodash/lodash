'use strict';

const async = require('async');
const path = require('path');

const file = require('../common/file');
const util = require('../common/util');

const basePath = path.join(__dirname, '..', '..');
const distPath = path.join(basePath, 'dist');
const filename = 'lodash.js';

const baseLodash = path.join(basePath, filename);
const distLodash = path.join(distPath, filename);

/*----------------------------------------------------------------------------*/

/**
 * Creates browser builds of Lodash at the `target` path.
 *
 * @private
 * @param {string} target The output directory path.
 */
function build() {
  async.series([
    file.copy(baseLodash, distLodash),
    file.min(distLodash)
  ], util.pitch);
}

build();
