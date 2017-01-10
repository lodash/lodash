import baseIsArrayBuffer from './_baseIsArrayBuffer.js';
import nodeUtil from './_nodeUtil.js';

/* Node.js helper references. */
const nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer;

/**
 * Checks if `value` is classified as an `ArrayBuffer` object.
 *
 * @static
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
 * @example
 *
 * isArrayBuffer(new ArrayBuffer(2));
 * // => true
 *
 * isArrayBuffer(new Array(2));
 * // => false
 */
const isArrayBuffer = nodeIsArrayBuffer
  ? value => nodeIsArrayBuffer(value)
  : baseIsArrayBuffer;

export default isArrayBuffer;
