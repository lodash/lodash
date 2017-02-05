/**
 * Checks if `value` is `null`.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
 * @example
 *
 * isNull(null)
 * // => true
 *
 * isNull(void 0)
 * // => false
 */
function isNull(value) {
  return value === null
}

export default isNull
