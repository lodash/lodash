import baseToString from './.internal/baseToString.js';
import castSlice from './.internal/castSlice.js';
import charsStartIndex from './.internal/charsStartIndex.js';
import stringToArray from './.internal/stringToArray.js';
import toString from './toString.js';

/** Used to match leading and trailing whitespace. */
const reTrimStart = /^\s+/;

/**
 * Removes leading whitespace or specified characters from `string`.
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `map`.
 * @returns {string} Returns the trimmed string.
 * @see trim, trimEnd
 * @example
 *
 * trimStart('  abc  ');
 * // => 'abc  '
 *
 * trimStart('-_-abc-_-', '_-');
 * // => 'abc-_-'
 */
function trimStart(string, chars, guard) {
  string = toString(string);
  if (string && (guard || chars === undefined)) {
    return string.replace(reTrimStart, '');
  }
  if (!string || !(chars = baseToString(chars))) {
    return string;
  }
  const strSymbols = stringToArray(string);
  const start = charsStartIndex(strSymbols, stringToArray(chars));
  return castSlice(strSymbols, start).join('');
}

export default trimStart;
