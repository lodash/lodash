/**
 * Checks if `value` is `null` or `undefined`.
 *
 * @since 4.0.0
 * @category Lang
 * @example
 *   isNil(null)
 *   // => true
 *
 *   isNil(void 0)
 *   // => true
 *
 *   isNil(NaN)
 *   // => false
 *
 * @param {any} value The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 */
function isNil(value) {
  return value == null
}

export default isNil
