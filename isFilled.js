import isBlank from './isBlank.js'

/**
 * Checks if `value` is filled.It is opposite of isBlank()
 *
 * @since 4.17.1
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a filled, else `false`.
 * @example
 *
 * isFilled([])
 * // => false
 *
 * isFilled(0)
 * // => true
 *
 * isFilled(false)
 * // => true
 *
 * isFilled(null)
 * // => false
 */
function isFilled(value) {
  return !isBlank(value)
}

export default isFilled
