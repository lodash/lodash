import baseStandardDeviationBy from './standardDeviationBy.js'

/**
 * Computes the mean of the values in `array`.
 *
 * @since 4.0.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {number} Returns the mean.
 * @example
 *
 * mean([4, 2, 8, 6])
 * // => 2.236067977
 */
function standardDeviation(array) {
  return baseStandardDeviationBy(array, (value) => value)
}

export default standardDeviation
