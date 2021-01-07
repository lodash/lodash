import createCaseFirst from './.internal/createCaseFirst.js'

/**
 * Converts the first character of `string` to lower case.
 *
 * @since 4.0.0
 * @category String
 * @example
 *   lowerFirst('Fred')
 *   // => 'fred'
 *
 *   lowerFirst('FRED')
 *   // => 'fRED'
 *
 * @param {string} [string] The string to convert. Default is `''`
 * @returns {string} Returns the converted string.
 */
const lowerFirst = createCaseFirst('toLowerCase')

export default lowerFirst
