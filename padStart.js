import createPadding from './.internal/createPadding.js'
import stringSize from './.internal/stringSize.js'

/**
 * Pads `string` on the left side if it's shorter than `length`. Padding
 * characters are truncated if they exceed `length`.
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to pad.
 * @param {number} [length=0] The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padded string.
 * @example
 *
 * padStart('abc', 6)
 * // => '   abc'
 *
 * padStart('abc', 6, '_-')
 * // => '_-_abc'
 *
 * padStart('abc', 2)
 * // => 'abc'
 */
function padStart(string, length, chars) {
  const strLength = length ? stringSize(string) : 0
  return (length && strLength < length)
    ? (createPadding(length - strLength, chars) + string)
    : (string || '')
}

export default padStart
