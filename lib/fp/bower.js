var baseConvert = require('./base.js');

/**
 * Converts `lodash` to an auto-curried iteratee-first data-last version.
 *
 * @param {Function} lodash The lodash function.
 * @returns {Function} Returns the converted lodash function.
 */
function bowerConvert(lodash) {
  return baseConvert(lodash, lodash);
}

module.exports = bowerConvert;
