import upperFirst from './upperFirst.js'
import toString from './toString.js'

/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @param {string|string[]} [locales=[]] Optional locale information to use.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * capitalize('FRED')
 * // => 'Fred'
 */
const capitalize = (string, locales = []) => upperFirst(toString(string).toLocaleLowerCase(locales), locales)


export default capitalize
