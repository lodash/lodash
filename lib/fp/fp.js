var _ = require('lodash'),
    base = require('./base.js'),
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
      name = args[0],
      func = args[1],
      length = args.length;

  if (length == 1) {
    func = name;
    name = undefined;
  }
  return length
    ? base(util, name, func)
    : base(util, _.runInContext());
}

module.exports = convert;
