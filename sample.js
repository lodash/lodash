/**
 * Gets a random element from `array`.
 *
 * @since 2.0.0
 * @category Array
 * @param {Array} array The array to sample.
 * @returns {*} Returns the random element.
 * @example
 *
 * sample([1, 2, 3, 4])
 * // => 2
 */
function sample(array) {
  if (array === null || array === undefined || array.length === 0) { return undefined }
  return array[Math.floor(Math.random() * array.length)]
}

export default sample
