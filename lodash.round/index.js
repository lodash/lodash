/**
 * lodash 3.10.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Native method references. */
var pow = Math.pow;

/**
 * Creates a `_.ceil`, `_.floor`, or `_.round` function.
 *
 * @private
 * @param {string} methodName The name of the `Math` method to use when rounding.
 * @returns {Function} Returns the new round function.
 */
function createRound(methodName) {
  var func = Math[methodName];
  return function(number, precision) {
    precision = precision === undefined ? 0 : (+precision || 0);
    if (precision) {
      precision = pow(10, precision);
      return func(number * precision) / precision;
    }
    return func(number);
  };
}

/**
 * Calculates `n` rounded to `precision`.
 *
 * @static
 * @memberOf _
 * @category Math
 * @param {number} n The number to round.
 * @param {number} [precision=0] The precision to round to.
 * @returns {number} Returns the rounded number.
 * @example
 *
 * _.round(4.006);
 * // => 4
 *
 * _.round(4.006, 2);
 * // => 4.01
 *
 * _.round(4060, -2);
 * // => 4100
 */
var round = createRound('round');

module.exports = round;
