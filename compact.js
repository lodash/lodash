/**
 * Creates a collection with all falsey values removed. The values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * @since 4.17.21
 * @category Array
 * @param {Array|Object} collection The collection to compact.
 * @returns {Array|Object} Returns the new collection of filtered values.
 * @example
 *
 * compact([0, 1, false, 2, '', 3])
 * // => [1, 2, 3]
 * compact({ a: 0, b: 1, c: false, d: 2, e: '', f: 3 })
 * // => { b: 1, d: 2, f: 3 }
 */
function compact(input) {
  let result

  if (Array.isArray(input)) {
    result = []

    let resIndex = 0
    for (const value of input) {
      if (value) {
        result[resIndex++] = value
      }
    }
  } else {
    result = {}

    for (const key in input) {
      if (input[key]) {
        result[key] = input[key]
      }
    }
  }

  return result
}

export default compact
