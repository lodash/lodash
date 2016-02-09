var Entry = require('docdown/lib/entry'),
    getReorderedParams = require('./parameters'),
    getReorderedExample = require('./example');

/**
 * Updates `docdown` `Entry`'s prototype so that parameters/arguments are reordered according to `mapping`.
 */
module.exports = function applyFPMapping(mapping) {
  Entry.prototype.getParams = getReorderedParams(mapping);
  Entry.prototype.getExample = getReorderedExample(mapping);
};
