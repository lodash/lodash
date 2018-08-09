import baseVariance from './varianceBy.js'

/**
 * Computes the variance of the values in `array`.
 *
 * @since 4.0.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {number} Returns the variance, ∑(Xi-μ)²/n.
 * @example
 *
 * variance([4, 2, 8, 6])
 * // => 5
 */
function variance(array) {
  return baseVariance(array, (value) => value)
}

export default variance
