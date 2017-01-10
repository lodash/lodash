import baseIsTypedArray from './_baseIsTypedArray.js';
import nodeUtil from './_nodeUtil.js';

/* Node.js helper references. */
const nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
const isTypedArray = nodeIsTypedArray
  ? value => nodeIsTypedArray(value)
  : baseIsTypedArray;

export default isTypedArray;
