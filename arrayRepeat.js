/**
 * Creates a new array containing the elements of an existing array repeated
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to repeat
 * @param {Number} times An integer specifying how many times elements of the existing array should be repeated
 * @returns {Array} an array containing the elements of the existing array repeated
 * @example
 *
 * arrayRepeat([1, 2, 3], 3)
 * // => [1, 2, 3, 1, 2, 3, 1, 2, 3]
 */
function arrayRepeat(array, times) {
  if (!Array.isArray(array)) {
    throw new TypeError('Expected array argument to be an array')
  }

  if (!Number.isInteger(times)) {
    throw new TypeError('Expected times argument to be an integer')
  }

  let filledArray = []
  for (let index = 0; index < times; index++) {
    filledArray = [...filledArray, ...array]
  }
  return filledArray
}

export default arrayRepeat
