import baseSortedIndex from './.internal/baseSortedIndex.js'

/**
 * This method is like `sortedIndex` except that it returns the highest index
 * at which `value` should be inserted into `array` in order to maintain its sort order.
 *
 * @since 3.0.0
 * @category Array
 * @example
 *   sortedLastIndex([4, 5, 5, 5, 6], 5)
 *   // => 4
 *
 * @param {Array} array The sorted array to inspect.
 * @param {any} value The value to evaluate.
 * @returns {number} Returns the index at which `value` should be inserted into `array`.
 */
function sortedLastIndex(array, value) {
  return baseSortedIndex(array, value, true)
}

export default sortedLastIndex
