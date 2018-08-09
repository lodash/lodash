import baseMedian from './medianBy.js'

/**
 * Computes the median of the values in `array`.
 *
 * @since 4.0.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {number} Returns the median, sorts the list and gets the (n+1)/2 th number.
 * @example
 *
 * median([4, 2, 8, 6])
 * // => 4
 */
function median(array) {
  return baseMedian(array, (value) => value)
}

export default median
