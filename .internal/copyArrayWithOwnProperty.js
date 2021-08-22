/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [target=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArrayWithOwnProperty(source, target) {
  if (!Array.isArray(source)) throw new Error('source is not an array!')
  const length = source.length
  target || (target = new Array(length))

  for (let key in source) {
    if (target.hasOwnProperty(key)) {
      target[key] = source[key]
    }
  }
  return target
}

export default copyArrayWithOwnProperty
