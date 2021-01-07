import baseMean from './meanBy.js'

/**
 * Computes the mean of the values in `array`.
 *
 * @since 4.0.0
 * @category Math
 * @example
 *   mean([4, 2, 8, 6])
 *   // => 5
 *
 * @param {Array} array The array to iterate over.
 * @returns {number} Returns the mean.
 */
function mean(array) {
  return baseMean(array, (value) => value)
}

export default mean
