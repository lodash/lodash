import { isArrayLikeObject, isEmpty, isNumber, isPlainObject, map, some } from 'lodash'

/**
 * Checks an `object` or `array` that has an empty value by the `isEmpty`function.
 * If there are numeric values in 1 levels deeper (or more) of an object (or array),
 * it means that it's not empty.
 *
 * When a value known empty by `hasDeepEmpty` then `predicate` function invoked by
 * `value`, `key` and `parent` arguments.
 *
 * Objects has empty value if they have no own enumerable string keyed properties
 * or contains at least an empty value which rejected with `isEmpty`.
 *
 * Array-Like-Object values such as `arguments` objects, arrays, buffers, or
 * jQuery-like collections are considered empty if they have a `length` of `0`
 * or contains at least one empty value that rejects with `isEmpty` (except Numerical values).
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @param {Function} predicate If an empty value is detected, the function invoked by `value`, `key` and `parent` arguments.
 * @returns {boolean} Returns `true` if `value` contains at least one empty value, else `false`.
 * @example
 *
 * hasDeepEmpty([])
 * // => true
 *
 * hasDeepEmpty([undefined])
 * // => true
 *
 * hasDeepEmpty([1])
 * // => false
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
 *
 * hasDeepEmpty({ 'a': '' }, (v) => !isString(v))
 * // => false
 */
function hasDeepEmpty(value, predicate = null) {
  return recursiveHasDeepEmpty(value, null, null, predicate)
}

function recursiveHasDeepEmpty(value, key, parent, predicate) {
  if (isEmpty(value)) {
    return predicate ? predicate(value, key, parent) : true
  } else if (isPlainObject(value) || isArrayLikeObject(value)) {
    const emptyState = map(value, (v, k) => isNumber(v) ? false : recursiveHasDeepEmpty(v, k, value, predicate))
    return some(emptyState)
  }

  return false
}

export default hasDeepEmpty
