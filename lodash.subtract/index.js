/**
 * lodash 4.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Subtract two numbers.
 *
 * @static
 * @memberOf _
 * @category Math
 * @param {number} minuend The first number in a subtraction.
 * @param {number} subtrahend The second number in a subtraction.
 * @returns {number} Returns the difference.
 * @example
 *
 * _.subtract(6, 4);
 * // => 2
 */
function subtract(minuend, subtrahend) {
  var result;
  if (minuend !== undefined) {
    result = minuend;
  }
  if (subtrahend !== undefined) {
    result = result === undefined ? subtrahend : (result - subtrahend);
  }
  return result;
}

module.exports = subtract;
