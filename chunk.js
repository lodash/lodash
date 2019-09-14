import slice from './slice.js'
import toInteger from './toInteger.js'

/*
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
 * chunk({
 *    array: ['a','b','c','d'],
 *    size: 2
 * })
 * // => [['a', 'b'], ['c', 'd']]
 *
 * chunk({
 *    array: ['a','b','c','d'],
 *    size: 3
 * })
 * // => [['a', 'b', 'c'], ['d']]
 *
 * chunk({
 *    array: ['a','b','c','d'],
 *    size: 3,
 *    filler: 'e'
 * })
 * // => [['a', 'b', 'c'], ['d', 'e', 'e']]
 *
 * chunk({
 *    array: ['a','b','c','d'],
 *    size: 3,
 *    filler: null
 * })
 * // => [['a', 'b', 'c'], ['d', null, null]]
 *
 * chunk({
 *    array: ['a','b','c','d'],
 *    size: 3,
 *    filler: undefined
 * })
 * // => [[ 'a', 'b', 'c' ], [ 'd', undefined, undefined ]]
 */
function chunk(options) {
  const size = Math.max(toInteger(options.size), 0)
  const length = options.array == null ? 0 : options.array.length
  if (!length || size < 1) {
    return []
  }
  let index = 0
  let resIndex = 0
  const result = new Array(Math.ceil(length / size))
  while (index < length) {
    const arrayChunk = slice(options.array, index, (index += size))
    const arrayChunkLength = arrayChunk.length
    if (arrayChunkLength < size && options.hasOwnProperty('filler')) {
      for (let i = 0; i < (size-(arrayChunkLength)); i++) {
        arrayChunk.push(options.filler)
      }
    }
    result[resIndex++] = arrayChunk
  }
  return result
}

export default chunk
