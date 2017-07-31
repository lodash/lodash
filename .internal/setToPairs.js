/**
 * Converts `set` to its value-value pairs.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the value-value pairs.
 */
function setToPairs(set) {
  let index = -1
  const result = new Array(set.size)

  set.forEach((value) => {
    result[++index] = [value, value]
  })
  return result
}

export default setToPairs
