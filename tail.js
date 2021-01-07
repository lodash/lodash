/**
 * Gets all but the first element of `array`.
 *
 * @since 4.0.0
 * @category Array
 * @example
 *   tail([1, 2, 3])
 *   // => [2, 3]
 *
 * @param {Array} array The array to query.
 * @returns {Array} Returns the slice of `array`.
 */
function tail(array) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  const [, ...result] = array
  return result
}

export default tail
