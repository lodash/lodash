import baseToNumber from './baseToNumber'
import baseToString from './baseToString'

/**
 * Helper to convert value to number or string based on its type.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {number|string} Returns the converted value.
 */
function convertToNumberOrString(value) {
    return typeof value === 'string' ? baseToString(value) : baseToNumber(value);
}  

export default convertToNumberOrString