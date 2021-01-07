/**
 * Gets the first element of `array`.
 *
 * @since 0.1.0
 * @category Array
 * @example
 *   head([1, 2, 3])
 *   // => 1
 *
 *   head([])
 *   // => undefined
 *
 * @param {Array} array The array to query.
 * @see last
 * @alias first
 * @returns {any} Returns the first element of `array`.
 */
function head(array) {
  return array != null && array.length ? array[0] : undefined
}

export default head
