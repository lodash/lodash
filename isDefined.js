/**
 * Checks if `value` is not `undefined`.
 *
 * @since 4.17.5
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is not `undefined`, else `false`.
 * @example
 *
 * isDefined(void 0)
 * // => false
 *
 * isDefined(null)
 * // => true
 * 
 * This is the inverse of _.isUndefined(value)
 */
function isDefined(value) {
  return value !== undefined
}

export default isDefined
