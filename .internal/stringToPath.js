import memoizeCapped from './memoizeCapped.js';

/** Used to match property names within property paths. */
const reLeadingDot = /^\./;
const rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
const reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
const stringToPath = memoizeCapped(string => {
  const result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, (match, number, quote, string) => {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

export default stringToPath;
