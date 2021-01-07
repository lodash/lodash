/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @since 4.0.0
 * @category Lang
 * @example
 *   isObjectLike({})
 *   // => true
 *
 *   isObjectLike([1, 2, 3])
 *   // => true
 *
 *   isObjectLike(Function)
 *   // => false
 *
 *   isObjectLike(null)
 *   // => false
 *
 * @param {any} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return typeof value === 'object' && value !== null
}

export default isObjectLike
