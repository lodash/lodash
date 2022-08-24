import { isArrayLikeObject, isEmpty, isNumber, isPlainObject, map, some } from 'lodash'

/**
 * Checks an `object` or `array` that has an empty value by the `isEmpty`
 * function.
 *
 * If there are numeric values in 1 levels deeper (or more) of an object (or array),
 * it means that it's not empty.
 *
 * Objects has empty value if they have no own enumerable string keyed
 * properties or contains at least an empty value which rejected with `isEmpty`.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`
 * or contains at least an empty value which rejected with `isEmpty`.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` contains at least an empty value, else `false`.
 * @example
 *
 * const val = anyValueExceptObjectAndArray
 * hasDeepEmpty(val)
 * // => isEmpty(val)
 *
 * hasDeepEmpty([])
 * // => true
 *
 * hasDeepEmpty([undefined])
 * // => true
 *
 * hasDeepEmpty([1, [null], 3])
 * // => true
 *
 * hasDeepEmpty(['abc', [undefined]])
 * // => true
 *
 * hasDeepEmpty({ 'a': null, 'b': { 'c': 5 } })
 * // => true
 *
 * hasDeepEmpty({ 'a': { 'b': 5, 'c': 6, 'd': {} } })
 * // => true
 *
 * hasDeepEmpty({ 'a': { 'b': 5, 'c': 6, 'd': [1, 2 ,3] } })
 * // => false
 */
function hasDeepEmpty(value) {
  if (isEmpty(value)) {
    return true
  } else if (isPlainObject(value) || isArrayLikeObject(value)) {
    const emptyState = map(value, (v) => isNumber(v) ? false : hasDeepEmpty(v))
    return some(emptyState)
  }

  return false
}

export default hasDeepEmpty
