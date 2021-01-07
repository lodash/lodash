import createRange from './.internal/createRange.js'

/**
 * Creates an array of numbers (positive and/or negative) progressing from
 * `start` up to, but not including, `end`. A step of `-1` is used if a
 * negative `start` is specified without an `end` or `step`. If `end` is not
 * specified, it's set to `start`, and `start` is then set to `0`.
 *
 * **Note:** JavaScript follows the IEEE-754 standard for resolving
 * floating-point values which can produce unexpected results.
 *
 * @since 0.1.0
 * @category Util
 * @example
 *   range(4)
 *   // => [0, 1, 2, 3]
 *
 *   range(-4)
 *   // => [0, -1, -2, -3]
 *
 *   range(1, 5)
 *   // => [1, 2, 3, 4]
 *
 *   range(0, 20, 5)
 *   // => [0, 5, 10, 15]
 *
 *   range(0, -4, -1)
 *   // => [0, -1, -2, -3]
 *
 *   range(1, 4, 0)
 *   // => [1, 1, 1]
 *
 *   range(0)
 *   // => []
 *
 * @param {number} [start] The start of the range. Default is `0`
 * @param {number} end The end of the range.
 * @param {number} [step] The value to increment or decrement by. Default is `1`
 * @see inRange, rangeRight
 * @returns {Array} Returns the range of numbers.
 */
const range = createRange()

export default range
