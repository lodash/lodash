/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  let index = -1
  const result = new Array(map.size)

  map.forEach((value, key) => {
    result[++index] = [key, value]
  })
  return result
}

export default mapToArray
