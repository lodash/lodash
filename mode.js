import baseMode from './modeBy.js'

/**
 * Computes the mode of the values in `array`.
 *
 * @since 4.0.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {number} Returns the mode.
 * @example
 *
 * mode([4, 2, 2, 8, 6])
 * // => [2]
 */
function mode(array) {
  return baseMode(array, (value) => value)
}

export default mode
