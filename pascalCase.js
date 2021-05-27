import words from './words.js'
import toString from './toString.js'

/**
 * Converts `string` to [pascal case](https://wiki.c2.com/?PascalCase).
 *
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the pascal cased string.
 * @see camelCase, lowerCase, snakeCase, startCase, upperCase, upperFirst
 * @example
 *
 * pascalCase('Foo Bar')
 * // => 'Foo-bar'
 *
 * pascalCase('fooBar')
 * // => 'Foo-bar'
 *
 * pascalCase('__FOO_BAR__')
 * // => 'Foo-bar'
 */
const pascalCase = (string) => {
    const text = words(toString(string).replace(/['\u2019]/g, '')).reduce((result, word, index) => (
        result + (index ? '-' : '') + word.toLowerCase()
    ), '')
    return text[0].toUpperCase() + text.substr(1);
}

export default pascalCase