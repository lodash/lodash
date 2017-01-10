import baseGt from './.internal/baseGt.js';
import createRelationalOperation from './.internal/createRelationalOperation.js';

/**
 * Checks if `value` is greater than `other`.
 *
 * @static
 * @since 3.9.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is greater than `other`,
 *  else `false`.
 * @see lt
 * @example
 *
 * gt(3, 1);
 * // => true
 *
 * gt(3, 3);
 * // => false
 *
 * gt(1, 3);
 * // => false
 */
const gt = createRelationalOperation(baseGt);

export default gt;
