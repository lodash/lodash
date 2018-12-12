/**
 * Flattens `object` a single level deep.
 *
 * @since 4.18.0
 * @category Object
 * @param {Object} object The object to flatten.
 * @param {string} [separator="."] The symbol used to join keys
 * @returns {Object} Returns the new flattened object.
 * @see flatten
 * @example
 *
 * flattenObject({a: {b: {c: 'foo'}, d: 'bar'}})
 * // => {'a.b.c': 'foo', 'a.d': 'bar'}
 */
function flattenObject(object, separator = '.') {
  return Object.assign({}, ...(function _deep(_object, _path = []) {
    return [].concat(
      ...Object.keys(_object).map((key) => {
        if (typeof _object[key] === 'object' && _object[key] !== null && _object[key] !== undefined) {
          return _deep(_object[key], [..._path, ...[key]])
        }
        return {[[..._path, ...[key]].join(separator)]: _object[key]}
      })
    )
  })(object))
}

export default flattenObject
