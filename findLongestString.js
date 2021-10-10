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
  const otherTypeExit = array.every((item) => typeof item === 'string')
  if (!otherTypeExit) {
    throw new TypeError('input contains items that are not strings')
  }
  if (!array.length) {
    return null
  }
  const arrayEveryItemLen = array.map((item) => item.length)
  const maxLen = Math.max(...arrayEveryItemLen)
  const longestStrArr = array.filter((item) => item.length === maxLen)
  // if longest string has more than one return null
  if (longestStrArr.length > 1) {
    return null
  }
  return longestStrArr.shift()
}

export default findLongest
