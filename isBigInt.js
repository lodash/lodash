import getTag from './.internal/getTag.js'

/**
 * Checks if `value` is classified as a `BigInt` primitive.
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a BigInt, else `false`.
 * @example
 *
 * isBigInt(1n)
 * // => true
 *
 * isBigInt(BigInt('1'))
 * // => true
 *
 * isBigInt(123)
 * // => false
 */

function isBigInt(value) {
  const tag = getTag(value)
  return tag == '[object BigInt]'
}

export default isBigInt
