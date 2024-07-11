import isObject from './isObject.js';
import isSymbol from './isSymbol.js';

/** Used as references for various `Number` constants. */
const NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
const reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
const reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
const reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
const reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
const freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @param {Object} [options={}] The options object.
 * @param {number} [options.defaultValue=0] If NaN occurs, the options.defaultValue argument will be returned.
 * @returns {number} Returns the number.
 * @see isInteger, toInteger, isNumber
 * @example
 *
 * toNumber(3.2)
 * // => 3.2
 *
 * toNumber(Number.MIN_VALUE)
 * // => 5e-324
 *
 * toNumber(Infinity)
 * // => Infinity
 *
 * toNumber('3.2')
 * // => 3.2
 *
 * toNumber("someStringValue")
 * // => NaN
 *
 * toNumber("someStringValue", {})
 * // => NaN
 *
 * toNumber("someStringValue", {defaultValue: 0})
 * // => 0
 *
 * toNumber("23", {defaultValue: 0})
 * // => 23
 */
function toNumber(value, options = { defaultValue: NAN }) {
    const { defaultValue = NAN } = options;
    let finalValue;
    if (typeof value === 'number') {
        return value;
    }
    if (isSymbol(value)) {
        return defaultValue;
    }
    if (isObject(value)) {
        const other = typeof value.valueOf === 'function' ? value.valueOf() : value;
        value = isObject(other) ? `${other}` : other;
    }
    if (typeof value !== 'string') {
        finalValue = value === 0 ? value : +value;
    } else {
        value = value.replace(reTrim, '');
        const isBinary = reIsBinary.test(value);

        finalValue =
            isBinary || reIsOctal.test(value)
                ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
                : reIsBadHex.test(value)
                ? defaultValue
                : +value;
    }
    if (Number.isNaN(finalValue)) return defaultValue;
    return finalValue;
}

export default toNumber;
