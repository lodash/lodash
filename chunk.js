import slice from './slice.js'
import toInteger from './toInteger.js'

/**
 * Creates an array of elements split into groups the length of `size`.
 *
 * If `array` can't be split evenly, the final chunk will be the remaining elements.
 *
 * @since 3.0.0
 * @category Array
 * @example
 *   chunk(['a', 'b', 'c', 'd'], 2)
 *   // => [['a', 'b'], ['c', 'd']]
 *
 *   chunk(['a', 'b', 'c', 'd'], 3)
 *   // => [['a', 'b', 'c'], ['d']]
 *
 * @param {Array} array The array to process.
 * @param {number} [size] The length of each chunk Default is `1`
 * @returns {Array} Returns the new array of chunks.
 */
function chunk(array, size = 1) {
  size = Math.max(toInteger(size), 0)
  const length = array == null ? 0 : array.length
  if (!length || size < 1) {
    return []
  }
  let index = 0
  let resIndex = 0
  const result = new Array(Math.ceil(length / size))

  while (index < length) {
    result[resIndex++] = slice(array, index, (index += size))
  }
  return result
}

export default chunk
