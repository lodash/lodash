import upperFirst from './upperFirst.js'
import words from './words.js'

/**
 * Converts `string` to [start
 * case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
 *
 * @since 3.1.0
 * @category String
 * @example
 *   startCase('--foo-bar--')
 *   // => 'Foo Bar'
 *
 *   startCase('fooBar')
 *   // => 'Foo Bar'
 *
 *   startCase('__FOO_BAR__')
 *   // => 'FOO BAR'
 *
 * @param {string} [string] The string to convert. Default is `''`
 * @see camelCase, lowerCase, kebabCase, snakeCase, upperCase, upperFirst
 * @returns {string} Returns the start cased string.
 */
const startCase = (string) =>
  words(`${string}`.replace(/['\u2019]/g, '')).reduce(
    (result, word, index) => result + (index ? ' ' : '') + upperFirst(word),
    ''
  )

export default startCase
