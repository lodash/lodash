/**
 * Checks if `value` is an odd number
 *
 *
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an odd number.
 * @example
 *
 * isOdd(3)
 * // => true
 *
 * isOdd(2)
 * // => false
 *
 * isOdd(0)
 * // => false
 *
 * isOdd(Infinity)
 * // => false
 *
 * isOdd('3')
 * // => false
 */
function isOdd(value) {
  return Number.isInteger(value) && value % 2 === 1
}

export default isOdd
