import baseGetTag from './.internal/baseGetTag.js';
import isLength from './isLength.js';
import isObjectLike from './isObjectLike.js';
import nodeUtil from './.internal/nodeUtil.js';

/** Used to match `toStringTag` values of typed arrays. */
const reTypedTag = /^\[object (?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)\]$/;

/* Node.js helper references. */
const nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
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
  : value => isObjectLike(value) && isLength(value.length) && reTypedTag.test(baseGetTag(value));

export default isTypedArray;
