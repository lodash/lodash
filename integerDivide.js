import createMathOperation from "./.internal/createMathOperation.js";

/**
 * Divide two numbers by ignoring the numbers after the point.
 * Similar to x // y operator in Python.
 *
 * @since 4.7.0
 * @category Math
 * @param {number} dividend The first number in a division.
 * @param {number} divisor The second number in a division.
 * @returns {number} The result of the operation.
 * @example
 *
 * integerDivide(5, 2)
 * // => 2
 */

const integerDivide = createMathOperation(
  (dividend, divisor) => (dividend - (dividend % divisor)) / divisor,
  1
);

export default integerDivide;
