import root from './_root.js';

/* Built-in method references for those with the same name as other `lodash` methods. */
const nativeIsFinite = root.isFinite;

/**
 * Checks if `value` is a finite primitive number.
 *
 * **Note:** This method is based on
 * [`Number.isFinite`](https://mdn.io/Number/isFinite).
 *
 * @static
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
 * @example
 *
 * isFinite(3);
 * // => true
 *
 * isFinite(Number.MIN_VALUE);
 * // => true
 *
 * isFinite(Infinity);
 * // => false
 *
 * isFinite('3');
 * // => false
 */
function isFinite(value) {
  return typeof value == 'number' && nativeIsFinite(value);
}

export default isFinite;
