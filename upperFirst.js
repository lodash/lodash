import createCaseFirst from './.internal/createCaseFirst.js';

/**
 * Converts the first character of `string` to upper case.
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * upperFirst('fred');
 * // => 'Fred'
 *
 * upperFirst('FRED');
 * // => 'FRED'
 */
const upperFirst = createCaseFirst('toUpperCase');

export default upperFirst;
