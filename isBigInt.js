import baseGetTag from './.internal/baseGetTag.js'
import isObjectLike from './isObjectLike.js'

/**
 * Checks if `value` is classified as a `BigInt` primitive or object.
 *
 * @since 4.17.4
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a bigint, else `false`.
 * @example
 *
 * isBigInt(3)
 * // => false
 *
 * isBigInt(3n)
 * // => true
 *
 * isBigInt(4.4)
 * // => false
 *
 * isBigInt(BigInt(5))
 * // => true
 */
function isBigInt(value) {
  return typeof value == 'bigint' ||
    (isObjectLike(value) && baseGetTag(value) == '[object BigInt]')
}

export default isBigInt
