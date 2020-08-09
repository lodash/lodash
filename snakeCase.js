import words from './words.js'
import toString from './toString.js'

/**
 * Converts `string` to
 * [snake case](https://en.wikipedia.org/wiki/Snake_case).
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @returns {string} Returns the snake cased string.
 * @see camelCase, lowerCase, kebabCase, startCase, upperCase, upperFirst
 * @example
 *
 * snakeCase('Foo Bar')
 * // => 'foo_bar'
 *
 * snakeCase('fooBar')
 * // => 'foo_bar'
 *
 * snakeCase('--FOO-BAR--')
 * // => 'foo_bar'
 *
 * snakeCase('foo2bar')
 * // => 'foo_2_bar'
 *
 * snakeCase('FOOBARv1.0',/([A-Z]+)(v)(\d).(\d)/)
 * // => 'foobar_v_1_0'
 *
 * snakeCase('FooBARs',/([A-Z][a-z]+)(\w+)/)
 * // => 'foo_bars'
 */
const snakeCase = (string, pattern) => {
  const splitWords = words(toString(string).replace(/['\u2019]/g, ''), pattern)
  const wordsToJoin = pattern ? splitWords.slice(1) : splitWords

  return wordsToJoin.join('_').toLowerCase()
}

export default snakeCase
