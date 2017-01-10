import baseGetTag from './_baseGetTag.js';
import isObjectLike from './isObjectLike.js';

/** `Object#toString` result references. */
const stringTag = '[object String]';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * isString('abc');
 * // => true
 *
 * isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!Array.isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
}

export default isString;
