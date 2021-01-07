import createPadding from './.internal/createPadding.js'
import stringSize from './.internal/stringSize.js'

/**
 * Pads `string` on the right side if it's shorter than `length`. Padding
 * characters are truncated if they exceed `length`.
 *
 * @since 4.0.0
 * @category String
 * @example
 *   padEnd('abc', 6)
 *   // => 'abc   '
 *
 *   padEnd('abc', 6, '_-')
 *   // => 'abc_-_'
 *
 *   padEnd('abc', 2)
 *   // => 'abc'
 *
 * @param {string} [string] The string to pad. Default is `''`
 * @param {number} [length] The padding length. Default is `0`
 * @param {string} [chars] The string used as padding. Default is `' '`
 * @returns {string} Returns the padded string.
 */
function padEnd(string, length, chars) {
  const strLength = length ? stringSize(string) : 0
  return length && strLength < length
    ? string + createPadding(length - strLength, chars)
    : string || ''
}

export default padEnd
