import reUnicode from "./reUnicode"

/**
 * Gets the size of a Unicode `string`.
 *
 * @private
 * @param {string} string The string inspect.
 * @returns {number} Returns the string size.
 */
function unicodeSize(string) {
  let result = reUnicode.lastIndex = 0
  while (reUnicode.test(string)) {
    ++result
  }
  return result
}

export default unicodeSize
