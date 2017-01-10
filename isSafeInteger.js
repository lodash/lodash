import isInteger from './isInteger.js';

/** Used as references for various `Number` constants. */
const MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a safe integer. An integer is safe if it's an IEEE-754
 * double precision number which isn't the result of a rounded unsafe integer.
 *
 * **Note:** This method is based on
 * [`Number.isSafeInteger`](https://mdn.io/Number/isSafeInteger).
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a safe integer, else `false`.
 * @example
 *
 * isSafeInteger(3);
 * // => true
 *
 * isSafeInteger(Number.MIN_VALUE);
 * // => false
 *
 * isSafeInteger(Infinity);
 * // => false
 *
 * isSafeInteger('3');
 * // => false
 */
function isSafeInteger(value) {
  return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
}

export default isSafeInteger;
