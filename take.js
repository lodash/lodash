import slice from './slice.js'

/**
 * Creates a slice of `array` with `n` elements taken from the beginning.
 *
 * @since 0.1.0
 * @category Array
 * @example
 *   take([1, 2, 3])
 *   // => [1]
 *
 *   take([1, 2, 3], 2)
 *   // => [1, 2]
 *
 *   take([1, 2, 3], 5)
 *   // => [1, 2, 3]
 *
 *   take([1, 2, 3], 0)
 *   // => []
 *
 * @param {Array} array The array to query.
 * @param {number} [n] The number of elements to take. Default is `1`
 * @returns {Array} Returns the slice of `array`.
 */
function take(array, n = 1) {
  if (!(array != null && array.length)) {
    return []
  }
  return slice(array, 0, n < 0 ? 0 : n)
}

export default take
