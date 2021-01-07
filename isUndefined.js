/**
 * Checks if `value` is `undefined`.
 *
 * @since 0.1.0
 * @category Lang
 * @example
 *   isUndefined(void 0)
 *   // => true
 *
 *   isUndefined(null)
 *   // => false
 *
 * @param {any} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 */
function isUndefined(value) {
  return value === undefined
}

export default isUndefined
