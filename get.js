import baseGet from './.internal/baseGet.js'

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @since 3.7.0
 * @category Collection
 * @param {Array|Object} collection The collection to query.
 * @param {Array|string|number} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @see has, hasIn, set, unset
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }] }
 *
 * get(object, 'a[0].b.c')
 * // => 3
 *
 * get(object, ['a', '0', 'b', 'c'])
 * // => 3
 *
 * get(object, 'a.b.c', 'default')
 * // => 'default'
 *
 * const array = [{'a': 1}]
 *
 * get(array, [0, 'a'])
 * // => 1
 *
 */
function get(collection, path, defaultValue) {
  const result = collection == null ? undefined : baseGet(collection, path)
  return result === undefined ? defaultValue : result
}

export default get
