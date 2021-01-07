/**
 * Gets a random element from `array`.
 *
 * @since 2.0.0
 * @category Array
 * @example
 *   sample([1, 2, 3, 4])
 *   // => 2
 *
 * @param {Array} array The array to sample.
 * @returns {any} Returns the random element.
 */
function sample(array) {
  const length = array == null ? 0 : array.length
  return length ? array[Math.floor(Math.random() * length)] : undefined
}

export default sample
