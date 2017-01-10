import toInteger from './toInteger.js';

/**
 * Checks if `value` is an integer.
 *
 * **Note:** This method is based on
 * [`Number.isInteger`](https://mdn.io/Number/isInteger).
 *
 * @static
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
 * @example
 *
 * isInteger(3);
 * // => true
 *
 * isInteger(Number.MIN_VALUE);
 * // => false
 *
 * isInteger(Infinity);
 * // => false
 *
 * isInteger('3');
 * // => false
 */
function isInteger(value) {
  return typeof value == 'number' && value == toInteger(value);
}

export default isInteger;
