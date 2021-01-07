import upperFirst from './upperFirst.js'
import words from './words.js'
import toString from './toString.js'

/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @since 3.0.0
 * @category String
 * @example
 *   camelCase('Foo Bar')
 *   // => 'fooBar'
 *
 *   camelCase('--foo-bar--')
 *   // => 'fooBar'
 *
 *   camelCase('__FOO_BAR__')
 *   // => 'fooBar'
 *
 * @param {string} [string] The string to convert. Default is `''`
 * @see lowerCase, kebabCase, snakeCase, startCase, upperCase, upperFirst
 * @returns {string} Returns the camel cased string.
 */
const camelCase = (string) =>
  words(toString(string).replace(/['\u2019]/g, '')).reduce(
    (result, word, index) => {
      word = word.toLowerCase()
      return result + (index ? upperFirst(word) : word)
    },
    ''
  )

export default camelCase
