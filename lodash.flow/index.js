/**
 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a `_.flow` or `_.flowRight` function.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new flow function.
 */
function createFlow(fromRight) {
  return function() {
    var length = arguments.length;
    if (!length) {
      return function() { return arguments[0]; };
    }
    var index = fromRight ? length : -1,
        leftIndex = 0,
        funcs = Array(length);

    while ((fromRight ? index-- : ++index < length)) {
      var func = funcs[leftIndex++] = arguments[index];
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
    }
    return function() {
      var index = 0,
          result = funcs[index].apply(this, arguments);

      while (++index < length) {
        result = funcs[index].call(this, result);
      }
      return result;
    };
  };
}

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
 * function square(n) {
 *   return n * n;
 * }
 *
 * var addSquare = _.flow(_.add, square);
 * addSquare(1, 2);
 * // => 9
 */
var flow = createFlow();

module.exports = flow;
