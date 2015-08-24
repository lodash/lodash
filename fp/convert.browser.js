var baseConvert = require('./baseConvert.js');

/**
 * Converts `lodash` to an auto-curried iteratee-first data-last version.
 *
 * @param {Function} lodash The lodash function.
 * @returns {Function} Returns the converted lodash function.
 */
function browserConvert(lodash) {
  return baseConvert(lodash, lodash);
}

module.exports = browserConvert;
