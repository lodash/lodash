/**
 * Disorders the contents of an `array` randomly.
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to disorder.
 * @returns {Array} Returns the disordered `array` randomly.
 * @example
 *
 * var array = [1, 2, 3, 4]
 *
 * _.disorder(array)
 * // => [3, 4, 1, 2]
 */
function disorder(array) {
  return list.sort(() => Math.random() - 0.5)
}

export default disorder
