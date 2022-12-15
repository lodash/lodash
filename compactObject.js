/**
 * Creates an object with all falsey values removed from the original object. The values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * @since 4.17.21
 * @category Object
 * @param {Object} object The object to compact.
 * @returns {Object} Returns the new object of filtered values.
 * @example
 *
 * compact({a: 1, b: 'foo', c: null, e: 0, '': 1, false: NaN})
 * // => { a: 1, b: 'foo' }
 */
function compactObject(object) {
  if (object == null) {
    return {}
  }
  const result = {}
  const entries = Object.entries(object)

  for (const [key, value] of entries) {
    if (value && key) {
      result[key] = value
    }
  }
  return result
}

export default compactObject
