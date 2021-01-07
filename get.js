import baseGet from './.internal/baseGet.js'

/**
 * Gets the value at `path` of `object`. If the resolved value is `undefined`,
 * the `defaultValue` is returned in its place.
 *
 * @since 3.7.0
 * @category Object
 * @example
 *   const object = { a: [{ b: { c: 3 } }] }
 *
 *   get(object, 'a[0].b.c')
 *   // => 3
 *
 *   get(object, ['a', '0', 'b', 'c'])
 *   // => 3
 *
 *   get(object, 'a.b.c', 'default')
 *   // => 'default'
 *
 * @param {Object} object The object to query.
 * @param {Array | string} path The path of the property to get.
 * @param {any} [defaultValue] The value returned for `undefined` resolved values.
 * @see has, hasIn, set, unset
 * @returns {any} Returns the resolved value.
 */
function get(object, path, defaultValue) {
  const result = object == null ? undefined : baseGet(object, path)
  return result === undefined ? defaultValue : result
}

export default get
