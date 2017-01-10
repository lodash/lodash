import baseGetTag from './.internal/baseGetTag.js';
import isObjectLike from './isObjectLike.js';

/** `Object#toString` result references. */
const weakSetTag = '[object WeakSet]';

/**
 * Checks if `value` is classified as a `WeakSet` object.
 *
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a weak set, else `false`.
 * @example
 *
 * isWeakSet(new WeakSet);
 * // => true
 *
 * isWeakSet(new Set);
 * // => false
 */
function isWeakSet(value) {
  return isObjectLike(value) && baseGetTag(value) == weakSetTag;
}

export default isWeakSet;
