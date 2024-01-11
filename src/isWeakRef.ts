import getTag from './.internal/getTag.js';
import isObjectLike from './isObjectLike.js';

/**
 * Checks if `value` is classified as a `WeakRef` object.
 *
 * @since 5.0.1
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a weak ref, else `false`.
 * @example
 *
 * isWeakRef(new WeakRef)
 * // => true
 *
 * isWeakRef(new WeakMap)
 * // => false
 */
function isWeakRef(value) {
    return isObjectLike(value) && getTag(value) === '[object WeakRef]';
}

export default isWeakRef;
