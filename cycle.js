
/**
 * Cycles an array by an integer n. Right if n is positive,
 * left otherwise.
 *
 * @since ???
 * @category Array
 * @param {Array} array The array to cycle.
 * @param {Int} n The number of positions to cycle
 * @returns {Array} Returns the new array of cycled values
 * @see ???
 * @example
 *
 * cycle([1,2,3,4,5], 1)
 * // => [5,1,2,3,4]
 * 
 * cycle([1,2,3,4,5], -3)
 * // => [4,5,1,2,3]
 * 
 */

function cycle(array, n) {
  return array.splice(-n % array.length).concat(array)
}

export default cycle