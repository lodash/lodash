import words from './words.js'
import toString from './toString.js'

/**
 * Converts `string` to [snake case](https://en.wikipedia.org/wiki/Snake_case).
 *
 * @since 3.0.0
 * @category String
 * @example
 *   snakeCase('Foo Bar')
 *   // => 'foo_bar'
 *
 *   snakeCase('fooBar')
 *   // => 'foo_bar'
 *
 *   snakeCase('--FOO-BAR--')
 *   // => 'foo_bar'
 *
 *   snakeCase('foo2bar')
 *   // => 'foo_2_bar'
 *
 * @param {string} [string] The string to convert. Default is `''`
 * @see camelCase, lowerCase, kebabCase, startCase, upperCase, upperFirst
 * @returns {string} Returns the snake cased string.
 */
const snakeCase = (string) =>
  words(toString(string).replace(/['\u2019]/g, '')).reduce(
    (result, word, index) => result + (index ? '_' : '') + word.toLowerCase(),
    ''
  )

export default snakeCase
