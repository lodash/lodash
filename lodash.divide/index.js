/**
 * lodash 4.7.0 (Custom Build) <https://lodash.com/>
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
 * Divide two numbers.
 *
 * @static
 * @memberOf _
 * @since 4.7.0
 * @category Math
 * @param {number} dividend The first number in a division.
 * @param {number} divisor The second number in a division.
 * @returns {number} Returns the quotient.
 * @example
 *
 * _.divide(6, 4);
 * // => 1.5
 */
var divide = createMathOperation(function(dividend, divisor) {
  return dividend / divisor;
});

module.exports = divide;
