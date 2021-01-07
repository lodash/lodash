import createPadding from './.internal/createPadding.js'
import stringSize from './.internal/stringSize.js'

/**
 * Pads `string` on the left side if it's shorter than `length`. Padding
 * characters are truncated if they exceed `length`.
 *
 * @since 4.0.0
 * @category String
 * @example
 *   padStart('abc', 6)
 *   // => '   abc'
 *
 *   padStart('abc', 6, '_-')
 *   // => '_-_abc'
 *
 *   padStart('abc', 2)
 *   // => 'abc'
 *
 * @param {string} [string] The string to pad. Default is `''`
 * @param {number} [length] The padding length. Default is `0`
 * @param {string} [chars] The string used as padding. Default is `' '`
 * @returns {string} Returns the padded string.
 */
function padStart(string, length, chars) {
  const strLength = length ? stringSize(string) : 0
  return length && strLength < length
    ? createPadding(length - strLength, chars) + string
    : string || ''
}

export default padStart
