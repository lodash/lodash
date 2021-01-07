import createRange from './.internal/createRange.js'

/**
 * This method is like `range` except that it populates values in descending order.
 *
 * @since 4.0.0
 * @category Util
 * @example
 *   rangeRight(4)
 *   // => [3, 2, 1, 0]
 *
 *   rangeRight(-4)
 *   // => [-3, -2, -1, 0]
 *
 *   rangeRight(1, 5)
 *   // => [4, 3, 2, 1]
 *
 *   rangeRight(0, 20, 5)
 *   // => [15, 10, 5, 0]
 *
 *   rangeRight(0, -4, -1)
 *   // => [-3, -2, -1, 0]
 *
 *   rangeRight(1, 4, 0)
 *   // => [1, 1, 1]
 *
 *   rangeRight(0)
 *   // => []
 *
 * @param {number} [start] The start of the range. Default is `0`
 * @param {number} end The end of the range.
 * @param {number} [step] The value to increment or decrement by. Default is `1`
 * @see inRange, range
 * @returns {Array} Returns the range of numbers.
 */
const rangeRight = createRange(true)

export default rangeRight
