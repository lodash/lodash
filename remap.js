/**
 * Re-maps a number from one range to another.
 *
 * @since 5.0.0
 * @category Math
 * @param {number} value the number to map.
 * @param {number} fromLow the lower bound of the value’s current range.
 * @param {number} fromHigh the upper bound of the value’s current range.
 * @param {number} toLow the lower bound of the value’s target range.
 * @param {number} toHigh the upper bound of the value’s target range.
 * @returns {number} the mapped value.
 * @see createRemap
 * @example
 *
 * remap(50, 0, 100, 0, 50)
 * // => 25
 *
 * remap(76, 0, 1023, 0, 255)
 * // => 18.944281524926687
 */
function remap(value, fromLow, fromHigh, toLow, toHigh) {
  return ((value - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow) + toLow
}

export default remap
