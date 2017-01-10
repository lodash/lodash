import baseIsTypedArray from './.internal/baseIsTypedArray.js';
import nodeUtil from './.internal/nodeUtil.js';

/* Node.js helper references. */
const nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * isTypedArray(new Uint8Array);
 * // => true
 *
 * isTypedArray([]);
 * // => false
 */
const isTypedArray = nodeIsTypedArray
  ? value => nodeIsTypedArray(value)
  : baseIsTypedArray;

export default isTypedArray;
