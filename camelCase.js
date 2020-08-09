import upperFirst from './upperFirst.js'
import words from './words.js'
import toString from './toString.js'

/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @returns {string} Returns the camel cased string.
 * @see lowerCase, kebabCase, snakeCase, startCase, upperCase, upperFirst
 * @example
 *
 * camelCase('Foo Bar')
 * // => 'fooBar'
 *
 * camelCase('--foo-bar--')
 * // => 'fooBar'
 *
 * camelCase('__FOO_BAR__')
 * // => 'fooBar'
 *
 * camelCase('FooBARs',/([A-Z][a-z]+)(\w+)/)
 * // => 'fooBars'
 */
const camelCase = (string, pattern) => {
  const splitWords = words(toString(string).replace(/['\u2019]/g, ''), pattern)
  const wordsToJoin = pattern ? splitWords.slice(1) : splitWords

  return wordsToJoin.reduce((result, word, index) => {
    word = word.toLowerCase()
    return result + (index ? upperFirst(word) : word)
  }, '')
}

export default camelCase
