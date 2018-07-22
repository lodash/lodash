import castSlice from './.internal/castSlice.js'
import hasUnicode from './.internal/hasUnicode.js'
import isRegExp from './isRegExp.js'
import stringToArray from './.internal/stringToArray.js'

/** Used as references for the maximum length and index of an array. */
const MAX_ARRAY_LENGTH = 4294967295

/**
 * Splits `string` by `separator`, but in reverse
 *
 * **Note:** This method is based on
 * [`split`](https://github.com/lodash/lodash/blob/master/split.js).
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to split.
 * @param {RegExp|string} separator The separator pattern to split by.
 * @param {number} [limit] The length to truncate results to from the end.
 * @returns {Array} Returns the string segments.
 * @example
 *
 * rsplit('a-b-c', '-', 2)
 * // => ['b', 'c']
 */
function rsplit(string, separator, limit) {
  let splititems
  limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0
  if (!limit) {
    return []
  }
  if (string && (
    typeof separator === 'string' ||
    (separator != null && !isRegExp(separator))
  )) {
    if (!separator && hasUnicode(string)) {
      splititems = castSlice(stringToArray(string), 0)
    } else {
      splititems = string.split(separator)
    }
  }
  if (!splititems) {
    splititems = string.split(separator)
  }
  if (splititems.length === 1 && limit > 0) {
    return splititems
  }
  return limit ? splititems.slice(-limit) : splititems
}

export default rsplit
