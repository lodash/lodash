/**
 * Checks if `string` is in `uppercase`.
 *
 * @category String
 * @param {*} string The string to check.
 * @returns {boolean} Returns `true` if `string` is in `uppercase`, else `false`.
 * @example
 *
 * isUpperCase("FOOBAR")
 * // => true
 *
 * isUpperCase("foobar")
 * // => false
 *
 * isUpperCase("FooBar")
 * // => false
 */
function isUpperCase(string) {
  return string === string.toUpperCase()
}

export default isUpperCase
