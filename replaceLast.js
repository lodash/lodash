/**
 * Replaces the last match for `pattern` in `string` with `replacement`.
 *
 * **Note:** This method is based on
 * [`String#replace`](https://mdn.io/String/replace).
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to modify.
 * @param {RegExp|string} pattern The pattern to replace.
 * @param {Function|string} replacement The match replacement.
 * @returns {string} Returns the modified string.
 * @example
 *
 * replaceLast('Hello world, Hello', 'Hello', 'Hi')
 * // => 'Hello world, Hi'
 */
function replaceLast(string, pattern, replacement) {
  const match = string.match(pattern)
  const lastIndex = match ? string.lastIndexOf(match[match.length-1]) : -1
  return `${string.slice(0, lastIndex)}${string.slice(lastIndex).replace(pattern, replacement)}`
}

export default replaceLast
