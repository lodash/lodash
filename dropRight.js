import slice from './slice.js'
import toInteger from './toInteger.js'

/**
 * Creates a slice of `array` with `n` elements dropped from the end.
 *
 * @since 3.0.0
 * @category Array
 * @example
 *   dropRight([1, 2, 3])
 *   // => [1, 2]
 *
 *   dropRight([1, 2, 3], 2)
 *   // => [1]
 *
 *   dropRight([1, 2, 3], 5)
 *   // => []
 *
 *   dropRight([1, 2, 3], 0)
 *   // => [1, 2, 3]
 *
 * @param {Array} array The array to query.
 * @param {number} [n] The number of elements to drop. Default is `1`
 * @returns {Array} Returns the slice of `array`.
 */
function dropRight(array, n = 1) {
  const length = array == null ? 0 : array.length
  n = length - toInteger(n)
  return length ? slice(array, 0, n < 0 ? 0 : n) : []
}

export default dropRight
