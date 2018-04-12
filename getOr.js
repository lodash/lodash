import baseGet from './.internal/baseGet.js'

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `null`, the `orValue` is returned in its place. It returns `undefined`
 * if `object` is `null`.
 *
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [orValue] The value returned for `null` resolved values.
 * @returns {*} Returns the resolved value.
 * @see get, has, hasIn, set, unset
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }, { 'd': null }] }
 *
 * get(object, 'a[0].b.c')
 * // => 3
 *
 * get(object, ['a', '0', 'b', 'c'])
 * // => 3
 *
 * get(object, 'a[1].d', 'orValue')
 * // => 'orValue'
 */
function getOr(object, path, orValue) {
  const result = object == null ? undefined : baseGet(object, path)
  return result || orValue
}

export default getOr
