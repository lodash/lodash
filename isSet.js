import baseIsSet from './_baseIsSet.js';
import nodeUtil from './_nodeUtil.js';

/* Node.js helper references. */
const nodeIsSet = nodeUtil && nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * isSet(new Set);
 * // => true
 *
 * isSet(new WeakSet);
 * // => false
 */
const isSet = nodeIsSet
  ? value => nodeIsSet(value)
  : baseIsSet;

export default isSet;
