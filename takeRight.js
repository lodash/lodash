import slice from './slice.js'

/**
 * Creates a slice of `array` with `n` elements taken from the end.
 *
 * @since 3.0.0
 * @category Array
 * @example
 *   takeRight([1, 2, 3])
 *   // => [3]
 *
 *   takeRight([1, 2, 3], 2)
 *   // => [2, 3]
 *
 *   takeRight([1, 2, 3], 5)
 *   // => [1, 2, 3]
 *
 *   takeRight([1, 2, 3], 0)
 *   // => []
 *
 * @param {Array} array The array to query.
 * @param {number} [n] The number of elements to take. Default is `1`
 * @returns {Array} Returns the slice of `array`.
 */
function takeRight(array, n = 1) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  n = length - n
  return slice(array, n < 0 ? 0 : n, length)
}

export default takeRight
