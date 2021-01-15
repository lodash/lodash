import isNumber from './isNumber.js'

/**
 * Increases the value of a `number`.
 *
 * @since 4.17.15
 * @category Math
 * @param {number} number The number to increment.
 * @param {number} number Increment.
 * @returns {number} Returns the increment.
 * @example
 *
 * inc(4)
 * // => 5
 *
 * inc(2, 6)
 * // => 8
 *
 * inc(7.3)
 * // => 8.3
 *
 * inc("foo")
 * // => false
 */
function inc(number, increment=1) {
  return isNumber(number) ? number + increment : false
}

export default inc
