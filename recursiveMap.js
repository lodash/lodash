/**
 * Creates an array of values by running each element of `array` thru `iteratee`, if
 * the element is an array it runs recursiveMap on it.
 * The iteratee is invoked with one argument: (value).
 *
 * @since 5.0.0
 * @category Array
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n
 * }
 *
 * recursiveMap([[2, 4], 8], square)
 * // => [[4, 16], 64]
 */
function recursiveMap(array, iteratee) {
  let index = -1
  const length = array == null ? 0 : array.length
  const result = new Array(length)

  while (++index < length) {
    if (Array.isArray(array[index])) {
      result[index] = recursiveMap(array[index], iteratee)
    } else {
      result[index] = iteratee(array[index])
    }
  }
  return result
}

export default recursiveMap
