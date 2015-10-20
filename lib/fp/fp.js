var baseConvert = require('./base.js'),
    util = require('./util.js'),
    lodash = require('lodash');

/**
 * Converts `func` of `name` to an auto-curried iteratee-first data-last version.
 * If `name` is an object, the methods on it will be converted and the object returned.
 *
 * @param {string} name The name of the function to wrap.
 * @param {Function} func The function to wrap.
 * @returns {Function|Object} Returns the converted function or object.
 */
function convert(name, func) {
  if (!func) {
    func = name;
    name = null;
  }
  return name == null
    ? baseConvert(util, _.runInContext())
    : baseConvert(util, name, func);
}

module.exports = convert;
