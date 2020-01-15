
/**
 * Create new array with the separator between the elements.
 *
 * @param {Array} arr The array to iterate over.
 * @param {any} separator an element to insert between the collection elements.
 * @returns {Array} the array with the separator between each elements.
 *
 * intersperse(['a','b','c','d'], 'X')
 * // => ['a','X','b','X','c','X''D']
 */
function intersperse(arr, separator) {
  const result = []
  for (let i = 0; i < arr.length; i++) {
    if (i === arr.length - 1) {
      result.push(arr[i])
    } else {
      result.push(arr[i], separator)
    }
  }
  return result
}
export default intersperse
