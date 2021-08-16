/**
 * This method is to find the longest element in a Array
 *
 * @since 5.0.0
 * @category Collection
 * @param {Array} collection The collection to inspect.
 * @returns {string} Returns  longest element in a Array
 * @example
 *
 * findLongest(["abc", 'abcd', "abcde"])
 * // => "abcde"
 */
function findLongest(array) {
  if (!array.length) return "";
  const len = array.map(item => item.length);
  const max = Math.max(...len);
  const index = array.findIndex(item => item.length === max);
  return array[index];
}

export default findLongest;