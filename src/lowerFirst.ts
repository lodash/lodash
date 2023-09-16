import createCaseFirst from './.internal/createCaseFirst.js';

/**
 * Converts the first character of `string` to lower case.
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * lowerFirst('Fred')
 * // => 'fred'
 *
 * lowerFirst('FRED')
 * // => 'fRED'
 */
const lowerFirst = createCaseFirst('toLowerCase');

export default lowerFirst;
