/**
 * Checks if `string` starts with the given target string.
 *
 * @since 3.0.0
 * @category String
 * @example
 *   startsWith('abc', 'a')
 *   // => true
 *
 *   startsWith('abc', 'b')
 *   // => false
 *
 *   startsWith('abc', 'b', 1)
 *   // => true
 *
 * @param {string} [string] The string to inspect. Default is `''`
 * @param {string} [target] The string to search for.
 * @param {number} [position] The position to search from. Default is `0`
 * @see endsWith, includes
 * @returns {boolean} Returns `true` if `string` starts with `target`, else `false`.
 */
function startsWith(string, target, position) {
  const { length } = string
  position = position == null ? 0 : position
  if (position < 0) {
    position = 0
  } else if (position > length) {
    position = length
  }
  target = `${target}`
  return string.slice(position, position + target.length) == target
}

export default startsWith
