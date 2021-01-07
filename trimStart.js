import castSlice from './.internal/castSlice.js'
import charsStartIndex from './.internal/charsStartIndex.js'
import stringToArray from './.internal/stringToArray.js'

const methodName = ''.trimLeft ? 'trimLeft' : 'trimStart'

/**
 * Removes leading whitespace or specified characters from `string`.
 *
 * @since 4.0.0
 * @category String
 * @example
 *   trimStart('  abc  ')
 *   // => 'abc  '
 *
 *   trimStart('-_-abc-_-', '_-')
 *   // => 'abc-_-'
 *
 * @param {string} [string] The string to trim. Default is `''`
 * @param {string} [chars] The characters to trim. Default is `whitespace`
 * @see trim, trimEnd
 * @returns {string} Returns the trimmed string.
 */
function trimStart(string, chars) {
  if (string && chars === undefined) {
    return string[methodName]()
  }
  if (!string || !chars) {
    return string || ''
  }
  const strSymbols = stringToArray(string)
  const start = charsStartIndex(strSymbols, stringToArray(chars))
  return castSlice(strSymbols, start).join('')
}

export default trimStart
