import baseLt from './.internal/baseLt.js';
import createRelationalOperation from './.internal/createRelationalOperation.js';

/**
 * Checks if `value` is less than `other`.
 *
 * @since 3.9.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is less than `other`,
 *  else `false`.
 * @see gt
 * @example
 *
 * lt(1, 3);
 * // => true
 *
 * lt(3, 3);
 * // => false
 *
 * lt(3, 1);
 * // => false
 */
const lt = createRelationalOperation(baseLt);

export default lt;
