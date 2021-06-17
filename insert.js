/**
 * Inserts the string at specified position.
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] Given string.
 * @param {string} [string=''] The string to insert.
 * @param {number} [pos=0] at which position to insert.
 * @returns {string} Returns the inserted string.
 * @example
 *
 * insert('abcabc', 'de', 3)
 * // => 'abcdeabc'
 *
 * insert('abc', 'de', 0)
 * // => 'deabc'
 *
 * insert('abc', 'de', -1)
 * // => 'abdec'
 *
 * insert('abc', '', 0)
 * // => 'abc'
 *
 * insert('abc', '', -1)
 * // => 'abc'
 *
 * insert('abc', '')
 * // => 'abc'
 */

function insert(mainString, subString, pos) {
  if (typeof pos === 'undefined') {
    pos = 0
  }
  if (typeof subString === 'undefined') {
    subString = ''
  }
  return mainString ? mainString.slice(0, pos) + subString + mainString.slice(pos) : ''
}

export default insert
