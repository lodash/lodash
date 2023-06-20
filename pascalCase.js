import upperFirst from './upperFirst.js'
import words from './words.js'
import toString from './toString.js'

/**
 * Converts `string` to [pascal case](https://techterms.com/definition/pascalcase).
 *
 * @since 4.17.21
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the pascal cased string.
 * @see camelCase, lowerCase, kebabCase, snakeCase, startCase, upperCase, upperFirst
 * @example
 *
 * pascalCase('foo bar')
 * // => 'FooBar'
 *
 * pascalCase('--foo-Bar--')
 * // => 'FooBar'
 *
 * pascalCase('__FOO_BAR__')
 * // => 'FooBar'
 */
const pascalCase = (string) => (
  words(toString(string).replace(/['\u2019]/g, '')).reduce((result, word, index) => {
    word = word.toLowerCase()
    return result + upperFirst(word)
  }, '')
)

export default pascalCase
