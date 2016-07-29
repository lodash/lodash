/**
 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that invokes `func` with the `this` binding of the created
 * function and an array of arguments much like [`Function#apply`](https://es5.github.io/#x15.3.4.3).
 *
 * **Note:** This method is based on the [spread operator](https://developer.mozilla.org/Web/JavaScript/Reference/Operators/Spread_operator).
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to spread arguments over.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.spread(function(who, what) {
 *   return who + ' says ' + what;
 * });
 *
 * say(['fred', 'hello']);
 * // => 'fred says hello'
 *
 * // with a Promise
 * var numbers = Promise.all([
 *   Promise.resolve(40),
 *   Promise.resolve(36)
 * ]);
 *
 * numbers.then(_.spread(function(x, y) {
 *   return x + y;
 * }));
 * // => a Promise of 76
 */
function spread(func) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  return function(array) {
    return func.apply(this, array);
  };
}

module.exports = spread;
