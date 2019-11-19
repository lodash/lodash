import getTag from './.internal/getTag.js'

/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
 * @example
 *
 * isBoolean(false)
 * // => true
 *
 * *
 * isBoolean(true)
 * // => true
 *
 * * isBoolean(new Boolean())
 * // => true
 *
 * isBoolean(null)
 * // => false
 */

function isBoolean(value) {
  return typeof value === 'boolean' || getTag(value) == '[object Boolean]'
}

export default isBoolean
