import createRange from './.internal/createRange.js';

/**
 * This method is like `range` except that it populates values in
 * descending order.
 *
 * @since 4.0.0
 * @category Util
 * @param {number} [start=0] The start of the range.
 * @param {number} end The end of the range.
 * @param {number} [step=1] The value to increment or decrement by.
 * @returns {Array} Returns the range of numbers.
 * @see inRange, range
 * @example
 *
 * rangeRight(4)
 * // => [3, 2, 1, 0]
 *
 * rangeRight(-4)
 * // => [-3, -2, -1, 0]
 *
 * rangeRight(1, 5)
 * // => [4, 3, 2, 1]
 *
 * rangeRight(0, 20, 5)
 * // => [15, 10, 5, 0]
 *
 * rangeRight(0, -4, -1)
 * // => [-3, -2, -1, 0]
 *
 * rangeRight(1, 4, 0)
 * // => [1, 1, 1]
 *
 * rangeRight(0)
 * // => []
 */
const rangeRight = createRange(true);

export default rangeRight;
