/**
 * Checks if `value` is an even number
 *
 *
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an even number.
 * @example
 *
 * isOdd(32)
 * // => true
 *
 * isOdd(0)
 * // => true
 *
 * isOdd(1)
 * // => false
 *
 * isOdd(Infinity)
 * // => false
 *
 * isOdd('4')
 * // => false
 */
function isEven(value) {
  return Number.isInteger(value) && value % 2 === 0
}

export default isEven
