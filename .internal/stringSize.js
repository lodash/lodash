import asciiSize from './asciiSize.js'
import hasUnicode from './hasUnicode.js'
import unicodeSize from './unicodeSize.js'

/**
 * Gets the number of symbols in `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the string size.
 */
function stringSize(string) {
  return hasUnicode(string) ? unicodeSize(string) : asciiSize(string)
}

export default stringSize
