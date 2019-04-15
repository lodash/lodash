import isNaN from './isNaN.js'
import isNil from './isNil.js'
import overSome from './overSome.js'

/**
 * Checks `value` to determine whether a default value should be returned in
 * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
 * or `undefined`, or if `resolveEmpty` returns `true`.
 *
 * @since 4.14.0
 * @category Util
 * @param {*} value The value to check.
 * @param {*} defaultValue The default value.
 * @param {Function} resolveEmpty The function to determine if the value is empty.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * defaultTo(1, 10)
 * // => 1
 *
 * defaultTo(undefined, 10)
 * // => 10
 *
 * defaultTo('', 'default', isEmpty)
 * // => 'default'
 *
 * defaultTo(new Error(), 'default', isError)
 * // => 'default'
 */
function defaultTo(value, defaultValue, resolveEmpty = overSome([isNaN, isNil])) {
  return resolveEmpty(value) ? defaultValue : value
}

export default defaultTo
