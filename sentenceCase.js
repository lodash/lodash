import toString from './toString.js'
import upperFirst from './upperFirst.js'

/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to sentence-case.
 * @returns {string} Returns the sentence-cased string.
 * @example
 *
 * sentenceCase('FRED IS GREAT')
 * // => 'Fred is great'
 */
function sentenceCase(string) {
  return upperFirst(toString(string).toLowerCase())
}

export default sentenceCase
