'use strict';

/**
 * The UglifyJS options object for
 * [compress](https://github.com/mishoo/UglifyJS2#compressor-options),
 * [mangle](https://github.com/mishoo/UglifyJS2#mangler-options), and
 * [output](https://github.com/mishoo/UglifyJS2#beautifier-options) options.
 */
module.exports = {
  'compress': {
    'pure_getters': true,
    'unsafe': true,
    'warnings': false
  },
  'mangle': {
    'except': ['define']
  },
  'output': {
    'ascii_only': true,
    'comments': /^!|@cc_on|@license|@preserve/i,
    'max_line_len': 500
  }
};
