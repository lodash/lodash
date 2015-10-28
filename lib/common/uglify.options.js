module.exports = {
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
};
