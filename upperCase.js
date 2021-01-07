import words from './words.js'
import toString from './toString.js'

/**
 * Converts `string`, as space separated words, to upper case.
 *
 * @since 4.0.0
 * @category String
 * @example
 *   upperCase('--foo-bar')
 *   // => 'FOO BAR'
 *
 *   upperCase('fooBar')
 *   // => 'FOO BAR'
 *
 *   upperCase('__foo_bar__')
 *   // => 'FOO BAR'
 *
 * @param {string} [string] The string to convert. Default is `''`
 * @see camelCase, kebabCase, lowerCase, snakeCase, startCase, upperFirst
 * @returns {string} Returns the upper cased string.
 */
const upperCase = (string) =>
  words(toString(string).replace(/['\u2019]/g, '')).reduce(
    (result, word, index) => result + (index ? ' ' : '') + word.toUpperCase(),
    ''
  )

export default upperCase
