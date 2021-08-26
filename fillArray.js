/**
 * Creates a new array containing the elements of an existing array repeated
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to repeat
 * @param {Number} times An integer specifying how many times elements of the existing array should be repeated
 * @returns {Array} an array containing the elements of the existing array repeated
 * @example fillArray([1, 2, 3], 3) // returns [1, 2, 3, 1, 2, 3, 1, 2, 3]
 */
function fillArray(array, times) {
  let filledArray = []
  for (let index = 0; index < times; index++) {
    filledArray = [...filledArray, ...array]
  }
  return filledArray
}

export default fillArray