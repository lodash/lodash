/**
 * lodash 4.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/**
 * Creates a function that performs a mathematical operation on two values.
 *
 * @private
 * @param {Function} operator The function to perform the operation.
 * @returns {Function} Returns the new mathematical operation function.
 */
function createMathOperation(operator) {
  return function(value, other) {
    var result;
    if (value === undefined && other === undefined) {
      return 0;
    }
    if (value !== undefined) {
      result = value;
    }
    if (other !== undefined) {
      result = result === undefined ? other : operator(result, other);
    }
    return result;
  };
}

/**
 * Subtract two numbers.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Math
 * @param {number} minuend The first number in a subtraction.
 * @param {number} subtrahend The second number in a subtraction.
 * @returns {number} Returns the difference.
 * @example
 *
 * _.subtract(6, 4);
 * // => 2
 */
var subtract = createMathOperation(function(minuend, subtrahend) {
  return minuend - subtrahend;
});

module.exports = subtract;
