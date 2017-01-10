import baseGetTag from './.internal/baseGetTag.js';
import isLength from './isLength.js';
import isObjectLike from './isObjectLike.js';
import nodeUtil from './.internal/nodeUtil.js';

/** Used to identify `toStringTag` values of typed arrays. */
const typedArrayTags = {};
typedArrayTags['[object Float32Array]'] = typedArrayTags['[object Float64Array]'] =
typedArrayTags['[object Int8Array]'] = typedArrayTags['[object Int16Array]'] =
typedArrayTags['[object Int32Array]'] = typedArrayTags['[object Uint8Array]'] =
typedArrayTags['[object Uint8ClampedArray]'] = typedArrayTags['[object Uint16Array]'] =
typedArrayTags['[object Uint32Array]'] = true;

typedArrayTags['[object AsyncFunction]'] = typedArrayTags['[object Arguments]'] =
typedArrayTags['[object Array]'] = typedArrayTags['[object ArrayBuffer]'] =
typedArrayTags['[object Boolean]'] = typedArrayTags['[object DataView]'] =
typedArrayTags['[object Date]'] = typedArrayTags['[object Error]'] =
typedArrayTags['[object Function]'] = typedArrayTags['[object GeneratorFunction]'] =
typedArrayTags['[object Map]'] = typedArrayTags['[object Number]'] =
typedArrayTags['[object Object]'] = typedArrayTags['[object Proxy]'] =
typedArrayTags['[object RegExp]'] = typedArrayTags['[object Set]'] =
typedArrayTags['[object String]'] = typedArrayTags['[object WeakMap]'] = false;

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
  : value => isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];

export default isTypedArray;
