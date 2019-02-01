/**
 * Checks 'value' contains 4 byte characters.
 *
 * @since 5.0.0
 * @category String
 * @param {String} value The value to check.
 * @returns {boolean} Returns `true` if 'value' contains 4 byte characters.
 * @example
 *
 * is4byte('foo')
 * // => false
 *
 * is4byte('🍺')
 * // => true
 *
 * is4byte('🍣')
 * // => true
 *
 * is4byte('𠮷')
 * // => true
 */
function is4byte(value) {
  return /[\u{10000}-\u{10FFFF}]/u.test(value);
}

export default is4byte
