/**
 * Gets the last element of `array`.
 *
 * @since 0.1.0
 * @category Array
 * @example
 *   last([1, 2, 3])
 *   // => 3
 *
 * @param {Array} array The array to query.
 * @returns {any} Returns the last element of `array`.
 */
function last(array) {
  const length = array == null ? 0 : array.length
  return length ? array[length - 1] : undefined
}

export default last
