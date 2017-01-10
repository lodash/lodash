import baseToString from './_baseToString.js';
import castSlice from './_castSlice.js';
import charsEndIndex from './_charsEndIndex.js';
import charsStartIndex from './_charsStartIndex.js';
import stringToArray from './_stringToArray.js';
import toString from './toString.js';

/** Used to match leading and trailing whitespace. */
const reTrim = /^\s+|\s+$/g;

/**
 * Removes leading and trailing whitespace or specified characters from `string`.
 *
 * @static
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `map`.
 * @returns {string} Returns the trimmed string.
 * @example
 *
 * trim('  abc  ');
 * // => 'abc'
 *
 * trim('-_-abc-_-', '_-');
 * // => 'abc'
 *
 * map(['  foo  ', '  bar  '], trim);
 * // => ['foo', 'bar']
 */
function trim(string, chars, guard) {
  string = toString(string);
  if (string && (guard || chars === undefined)) {
    return string.replace(reTrim, '');
  }
  if (!string || !(chars = baseToString(chars))) {
    return string;
  }
  const strSymbols = stringToArray(string);
  const chrSymbols = stringToArray(chars);
  const start = charsStartIndex(strSymbols, chrSymbols);
  const end = charsEndIndex(strSymbols, chrSymbols) + 1;

  return castSlice(strSymbols, start, end).join('');
}

export default trim;
