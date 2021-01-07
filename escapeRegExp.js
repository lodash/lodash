/**
 * Used to match `RegExp` [syntax
 * characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
const reRegExpChar = /[\\^$.*+?()[\]{}|]/g
const reHasRegExpChar = RegExp(reRegExpChar.source)

/**
 * Escapes the `RegExp` special characters "^", "$", "\", ".", "\*", "+", "?",
 * "(", ")", "[", "]", "{", "}", and "|" in `string`.
 *
 * @since 3.0.0
 * @category String
 * @example
 *   escapeRegExp('[lodash](https://lodash.com/)')
 *   // => '\[lodash\]\(https://lodash\.com/\)'
 *
 * @param {string} [string] The string to escape. Default is `''`
 * @see escape, escapeRegExp, unescape
 * @returns {string} Returns the escaped string.
 */
function escapeRegExp(string) {
  return string && reHasRegExpChar.test(string)
    ? string.replace(reRegExpChar, '\\$&')
    : string || ''
}

export default escapeRegExp
