/**
 * This method is to find the longest element in a Array
 *
 * @since 5.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {string} Returns  longest element in a Array
 * @example
 *
 * findLongest(["abc", 'abcd', "abcde"])
 * // => "abcde"
 */
function findLongest(array) {
  if (!Array.isArray(array)) {
    throw new TypeError('Expected an Array')
  }
  if (!array.length) { return undefined }
  const len = array.map(item => item.length)
  const max = Math.max(...len)
  const index = array.findIndex(item => item.length === max)
  return array[index]
}

export default findLongest
