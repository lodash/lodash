import createCaseFirst from './.internal/createCaseFirst.js'

/**
 * Converts the first character of `string` to upper case.
 *
 * @since 4.0.0
 * @category String
 * @example
 *   upperFirst('fred')
 *   // => 'Fred'
 *
 *   upperFirst('FRED')
 *   // => 'FRED'
 *
 * @param {string} [string] The string to convert. Default is `''`
 * @see camelCase, kebabCase, lowerCase, snakeCase, startCase, upperCase
 * @returns {string} Returns the converted string.
 */
const upperFirst = createCaseFirst('toUpperCase')

export default upperFirst
