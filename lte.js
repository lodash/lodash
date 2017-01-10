import createRelationalOperation from './.internal/createRelationalOperation.js';

/**
 * Checks if `value` is less than or equal to `other`.
 *
 * @static
 * @since 3.9.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is less than or equal to
 *  `other`, else `false`.
 * @see gte
 * @example
 *
 * lte(1, 3);
 * // => true
 *
 * lte(3, 3);
 * // => true
 *
 * lte(3, 1);
 * // => false
 */
const lte = createRelationalOperation((value, other) => value <= other);

export default lte;
