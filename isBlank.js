import isNil from './isNil.js'
import isString from './isString.js'
import trim from './trim.js'
import isNumber from './isNumber.js'
import isBoolean from './isBoolean.js'
import isArrayLike from './isArrayLike.js'
import isObjectLike from './isObjectLike.js'
import every from './every.js'
import values from './values.js'
import isEmpty from './isEmpty.js'

/**
 * Checks if `value` is bland.
 *
 * @since 4.17.1
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `false` if `value` is a blank, else `true`.
 * @example
 *
 * isBlank([])
 * // => true
 *
 * isBlank([[]])
 * // => true
 *
 * isBlank(0)
 * // => false
 *
 * isBlank(false)
 * // => false
 *
 * isBlank(null)
 * // => true
 */
function isBlank(value) {
  if (isNil(value)) {
    return true
  }
  if (isString(value)) {
    return trim(value) === ''
  }
  if (isNumber(value)) {
    return false
  }
  if (isBoolean(value)) {
    return false
  }
  if (isArrayLike(value) || isObjectLike(value)) {
    return every(values(value), isBlank)
  }

  return isEmpty(value)
}

export default isBlank
