import isNumber from './isNumber.js'

/**
 * Decrease the value of a `number`.
 *
 * @since 4.17.15
 * @category Math
 * @param {number} number The number to decrease.
 * @param {number} number Decrease.
 * @returns {number} Returns the decrease.
 * @example
 *
 * dec(4)
 * // => 3
 *
 * dec(5, 3)
 * // => 2
 *
 * dec(7.3)
 * // => 6.3
 *
 * dec("foo")
 * // => false
 */
function dec(number, decrease=1) {
  return isNumber(number) ? number - decrease : false
}

export default dec
