/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @since 0.1.0
 * @category Lang
 * @example
 *   isFunction(class Any {})
 *   // => true
 *
 *   isFunction(() => {})
 *   // => true
 *
 *   isFunction(async () => {})
 *   // => true
 *
 *   isFunction(function* Any() {})
 *   // => true
 *
 *   isFunction(Math.round)
 *   // => true
 *
 *   isFunction(/abc/)
 *   // => false
 *
 * @param {any} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 */
function isFunction(value) {
  return typeof value === 'function'
}

export default isFunction
