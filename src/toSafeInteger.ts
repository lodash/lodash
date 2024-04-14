import toInteger from './toInteger.js';

/** Used as references for various `Number` constants. */
const MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Converts `value` to a safe integer. A safe integer can be compared and
 * represented correctly.
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * toSafeInteger(3.2)
 * // => 3
 *
 * toSafeInteger(Number.MIN_VALUE)
 * // => 0
 *
 * toSafeInteger(Infinity)
 * // => 9007199254740991
 *
 * toSafeInteger('3.2')
 * // => 3
 */
function toSafeInteger(value) {
    if (!value) {
        return value === 0 ? value : 0;
    }
    value = toInteger(value);
    if (value < -MAX_SAFE_INTEGER) {
        return -MAX_SAFE_INTEGER;
    }
    if (value > MAX_SAFE_INTEGER) {
        return MAX_SAFE_INTEGER;
    }
    return value;
}

export default toSafeInteger;
