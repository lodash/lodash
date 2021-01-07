import upperFirst from './upperFirst.js'
import toString from './toString.js'

/**
 * Converts the first character of `string` to upper case and the remaining to
 * lower case.
 *
 * @since 3.0.0
 * @category String
 * @example
 *   capitalize('FRED')
 *   // => 'Fred'
 *
 * @param {string} [string] The string to capitalize. Default is `''`
 * @returns {string} Returns the capitalized string.
 */
const capitalize = (string) => upperFirst(toString(string).toLowerCase())

export default capitalize
