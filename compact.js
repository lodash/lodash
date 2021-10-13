/**
 * Creates an array with all falsey values removed. The values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to compact.
 * @param {...Array} [values] The values to default.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * compact([0, 1, false, 2, '', 3])
 * // => [1, 2, 3]
 * compact([0, 1, false, 2, '',undefined, 3],['',undefined,NaN,null])
 * // => [0,1,false, 2, 3]
 */
function compact(array,falseyValues=[0,'',false,undefined,NaN,null]) {
  let resIndex = 0
  const result = []

  if (array == null) {
    return result
  }

  for (const value of array) {
    if (!falseyValues.includes(value)) {
      result[resIndex++] = value
    }
  }
  return result
}

export default compact
