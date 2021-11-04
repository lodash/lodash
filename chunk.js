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
 */
function chunk(array, size = 1) {
  let start = 0
  let count = 0
  let end = 0

  let chunkedArray = []

  for(let i = 0; i < array.length; i++, count += size){
      if(count < array.length){
          start = count
          end = count + size
          chunkedArray = [...chunkedArray, array.slice(start, end)]
      }
  }
  return chunkedArray;
}

export default chunk
