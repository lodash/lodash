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
  const type = typeof value
  return type === 'bigint' 
}

export default isBigInt
