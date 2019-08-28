import baseGet from './.internal/baseGet.js'
import isNumber from './isNumber.js'
import isUndefined from './isUndefined.js'

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
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
 */
function get(object, path, defaultValue, returnDefaultValueForFalsyResult) {
  const result = object == null ? undefined : baseGet(object, path)
  if (returnDefaultValueForFalsyResult) {
    return !result && !isNumber(result) ? defaultValue : result
  }
  return isUndefined(result) ? defaultValue : result
}

export default get
