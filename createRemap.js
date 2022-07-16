import remap from './remap'

/**
 * Re-maps a number from one range to another.
 *
 * @since 5.0.0
 * @category Math
 * @param {number} fromLow the lower bound of the value’s current range.
 * @param {number} fromHigh the upper bound of the value’s current range.
 * @param {number} toLow the lower bound of the value’s target range.
 * @param {number} toHigh the upper bound of the value’s target range.
 * @returns {(value: number) => number} the remap function.
 * @see remap
 * @example
 *
 * const remap1 = createRemap(0, 600, 0, 100)
 * const remap2 = createRemap(0, 100, 0, 600)
 *
 * remap1(24)
 * // => 4
 *
 * remap2(4)
 * // => 24
 */
function createRemap(fromLow, fromHigh, toLow, toHigh) {
  return function(value) {
    return remap(value, fromLow, fromHigh, toLow, toHigh)
  }
}

export default createRemap
