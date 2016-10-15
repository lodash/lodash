'use strict';

delete global['__core-js_shared__'];

const _ = require('./lodash.js');
const globals = require('lodash-doc-globals');

module.exports = {
  'babel': false,
  'globals': _.assign({ '_': _ }, globals)
};
