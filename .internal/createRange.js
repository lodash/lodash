import baseRange from './baseRange.js'
import toFinite from '../toFinite.js'

/**
 * Creates a `range` or `rangeRight` function.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new range function.
 */
function createRange(fromRight) {
  return (start, end, step) => {
    // Ensure the sign of `-0` is preserved.
    start = toFinite(start)
    if (end === undefined) {
      end = start
      start = 0
    } else {
      end = toFinite(end)
    }
    step = step === undefined ? (start < end ? 1 : -1) : toFinite(step)
    return baseRange(start, end, step, fromRight)
  }
}

export default createRange
