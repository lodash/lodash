/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArrayWithOwnProperty(source, array) {
  const length = source.length
  array || (array = new Array(length))

  for (let key in source) {
    if (array.hasOwnProperty(key)) {
      array[key] = source[key]
    }
  }
  return array
}

export default copyArrayWithOwnProperty
