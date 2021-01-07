/**
 * Checks if `string` ends with the given target string.
 *
 * @since 3.0.0
 * @category String
 * @example
 *   endsWith('abc', 'c')
 *   // => true
 *
 *   endsWith('abc', 'b')
 *   // => false
 *
 *   endsWith('abc', 'b', 2)
 *   // => true
 *
 * @param {string} [string] The string to inspect. Default is `''`
 * @param {string} [target] The string to search for.
 * @param {number} [position] The position to search up to. Default is `string.length`
 * @see includes, startsWith
 * @returns {boolean} Returns `true` if `string` ends with `target`, else `false`.
 */
function endsWith(string, target, position) {
  const { length } = string
  position = position === undefined ? length : +position
  if (position < 0 || position != position) {
    position = 0
  } else if (position > length) {
    position = length
  }
  const end = position
  position -= target.length
  return position >= 0 && string.slice(position, end) == target
}

export default endsWith
