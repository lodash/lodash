var _ = require('../lodash'),
    baseConvert = require('./baseConvert.js'),
    util = require('./util.js');

/**
 * Converts `func` of `name` to an auto-curried iteratee-first data-last version.
 * If `name` is an object, the methods on it will be converted and the object returned.
 *
 * @param {string} [name] The name of the function to wrap.
 * @param {Function} [func] The function to wrap.
 * @returns {Function|Object} Returns the converted function or object.
 */
function convert() {
  var args = arguments,
      name = args.length ? args[0] : _.noConflict().runInContext(),
      func = args[1];

  return baseConvert(util, name, func);
}

module.exports = convert;
