/**
 * Creates an array with all falsey values removed. The values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to compact.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * compact([0, 1, false, 2, '', 3])
 * // => [1, 2, 3]
 */
 function compact(input) {
  if (Array.isArray(input)) {
    let resIndex = 0
    const result = []
      
    if (input == null) {
      return result
    }
      
    for (const value of input) {
      if (value) {
        result[resIndex++] = value
      }
    }
    return result
  } else
  if (typeof input == "object") {
    const result = JSON.parse(JSON.stringify(input));

    for (const property in result) {
      if (!result[property]) {
        delete result[property]
      }
    }

    return result

  }
}

export default compact
