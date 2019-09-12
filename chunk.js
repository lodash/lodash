import slice from './slice.js'
import toInteger from './toInteger.js'

/**
 * Creates an array of elements split into groups the length of `size`.
 * If `array` can't be split evenly, the final chunk will be the remaining
 * elements.
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to process.
 * @param {number} [size=1] The length of each chunk
 * @returns {Array} Returns the new array of chunks.
 * @example
 *
 * chunk(['a', 'b', 'c', 'd'], 2)
 * // => [['a', 'b'], ['c', 'd']]
 *
 * chunk(['a', 'b', 'c', 'd'], 3)
 * // => [['a', 'b', 'c'], ['d']]
 *
 * chunk(['a', 'b', 'c', 'd', 3, 'e')
 * // => [['a', 'b', 'c'], ['d', 'e', 'e']]
 *
 * chunk(['a', 'b', 'c', 'd', 3, null)
 * // => [['a', 'b', 'c'], ['d', null, null]]
 *
 */
function chunk(array, size = 1,filler) {
  size = Math.max(toInteger(size), 0)
  const length = array == null ? 0 : array.length
  if (!length || size < 1) {
    return []
  }
  let index = 0
  let resIndex = 0
  const result = new Array(Math.ceil(length / size))
  while (index < length) {
    const arrayChunk = slice(array, index, (index += size))
    const arrayChunkLength = arrayChunk.length
    if (arrayChunkLength < size && filler !== undefined) {
      for (let i = 0; i < (size-(arrayChunkLength)); i++) {
        arrayChunk.push(filler)
      }
    }
    result[resIndex++] = arrayChunk
  }
  return result
}

export default chunk
