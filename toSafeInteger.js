import baseClamp from './.internal/baseClamp.js';
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
 * toSafeInteger(3.2);
 * // => 3
 *
 * toSafeInteger(Number.MIN_VALUE);
 * // => 0
 *
 * toSafeInteger(Infinity);
 * // => 9007199254740991
 *
 * toSafeInteger('3.2');
 * // => 3
 */
function toSafeInteger(value) {
  return value
    ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER)
    : (value === 0 ? value : 0);
}

export default toSafeInteger;
