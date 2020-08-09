import words from './words.js'
import toString from './toString.js'

/**
 * Converts `string` to
 * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @returns {string} Returns the kebab cased string.
 * @see camelCase, lowerCase, snakeCase, startCase, upperCase, upperFirst
 * @example
 *
 * kebabCase('Foo Bar')
 * // => 'foo-bar'
 *
 * kebabCase('fooBar')
 * // => 'foo-bar'
 *
 * kebabCase('__FOO_BAR__')
 * // => 'foo-bar'
 *
 * kebabCase('FOOBARv1.0',/([A-Z]+)(v)(\d).(\d)/)
 * // => 'foobar-v-1-0'
 *
 * kebabCase('FooBARs',/([A-Z][a-z]+)(\w+)/)
 * // => 'foo-bars'
 */

const kebabCase = (string, pattern) => {
  const splitWords = words(toString(string).replace(/['\u2019]/g, ''), pattern)
  const wordsToJoin = pattern ? splitWords.slice(1) : splitWords

  return wordsToJoin.join('-').toLowerCase()
}

export default kebabCase
