/**
 * Checks if `string` is in `lowercase`.
 *
 * @category String
 * @param {*} string The string to check.
 * @returns {boolean} Returns `true` if `string` is in `lowercase`, else `false`.
 * @example
 *
 * isLowerCase("foobar")
 * // => true
 *
 * isLowerCase("FOOBAR")
 * // => false
 *
 * isLowerCase("FooBar")
 * // => false
 */
function isLowerCase(string) {
  return string === string.toLowerCase()
}

export default isLowerCase
