import words from './words.js'
import toString from './toString.js'

/**
 * Converts `string` to [kebab
 * case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * @since 3.0.0
 * @category String
 * @example
 *   kebabCase('Foo Bar')
 *   // => 'foo-bar'
 *
 *   kebabCase('fooBar')
 *   // => 'foo-bar'
 *
 *   kebabCase('__FOO_BAR__')
 *   // => 'foo-bar'
 *
 * @param {string} [string] The string to convert. Default is `''`
 * @see camelCase, lowerCase, snakeCase, startCase, upperCase, upperFirst
 * @returns {string} Returns the kebab cased string.
 */
const kebabCase = (string) =>
  words(toString(string).replace(/['\u2019]/g, '')).reduce(
    (result, word, index) => result + (index ? '-' : '') + word.toLowerCase(),
    ''
  )

export default kebabCase
