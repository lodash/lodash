import { isNull, isUndefined } from 'lodash'

/**
 * Checks if `value` is `null` or `undefined`.
 *
 * @since 4.18.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `null` or `undefined`, else `false`.
 * @example
 *
 * isNullish(null)
 * // => true
 *
 * isNullish(undefined)
 * // => true
 *
 * isNullish(void 0)
 * // => false
 */
function isNullish(value) {
  return isNull(value) || isUndefined(value)
}

export default isNullish
