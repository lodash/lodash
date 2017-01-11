import asciiSize from './.internal/asciiSize.js';
import hasUnicode from './.internal/hasUnicode.js';
import unicodeSize from './.internal/unicodeSize.js';

/**
 * Gets the number of symbols in `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the string size.
 */
function stringSize(string) {
  return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
}

export default stringSize;
