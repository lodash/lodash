import slice from './slice.js'

/**
 * Gets all but the last element of `array`.
 *
 * @since 0.1.0
 * @category Array
 * @example
 *   initial([1, 2, 3])
 *   // => [1, 2]
 *
 * @param {Array} array The array to query.
 * @returns {Array} Returns the slice of `array`.
 */
function initial(array) {
  const length = array == null ? 0 : array.length
  return length ? slice(array, 0, -1) : []
}

export default initial
