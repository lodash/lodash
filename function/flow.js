var arrayEvery = require('../internal/arrayEvery'),
    isFunction = require('../lang/isFunction');

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that returns the result of invoking the provided
 * functions with the `this` binding of the created function, where each
 * successive invocation is supplied the return value of the previous.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {...Function} [funcs] Functions to invoke.
 * @returns {Function} Returns the new function.
 * @example
 *
 * function add(x, y) {
 *   return x + y;
 * }
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * var addSquare = _.flow(add, square);
 * addSquare(1, 2);
 * // => 9
 */
function flow() {
  var funcs = arguments,
      length = funcs.length;

  if (!length) {
    return function() {};
  }
  if (!arrayEvery(funcs, isFunction)) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  return function() {
    var index = 0,
        result = funcs[index].apply(this, arguments);

    while (++index < length) {
      result = funcs[index].call(this, result);
    }
    return result;
  };
}

module.exports = flow;
