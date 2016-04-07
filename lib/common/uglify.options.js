'use strict';

module.exports = {
  'compress': {
    'pure_getters': true,
    'unsafe': true,
    'unsafe_comps': true,
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
