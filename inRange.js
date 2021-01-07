import baseInRange from './.internal/baseInRange.js'

/**
 * Checks if `number` is between `start` and up to, but not including, `end`.
 * If `end` is not specified, it's set to `start` with `start` then set to `0`.
 * If `start` is greater than `end` the params are swapped to support negative ranges.
 *
 * @since 3.3.0
 * @category Number
 * @example
 *   inRange(3, 2, 4)
 *   // => true
 *
 *   inRange(4, 8)
 *   // => true
 *
 *   inRange(4, 2)
 *   // => false
 *
 *   inRange(2, 2)
 *   // => false
 *
 *   inRange(1.2, 2)
 *   // => true
 *
 *   inRange(5.2, 4)
 *   // => false
 *
 *   inRange(-3, -2, -6)
 *   // => true
 *
 * @param {number} number The number to check.
 * @param {number} [start] The start of the range. Default is `0`
 * @param {number} end The end of the range.
 * @see range, rangeRight
 * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
 */
function inRange(number, start, end) {
  if (end === undefined) {
    end = start
    start = 0
  }
  return baseInRange(+number, +start, +end)
}

export default inRange
