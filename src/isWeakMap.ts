import getTag from './.internal/getTag.js';
import isObjectLike from './isObjectLike.js';

/**
 * Checks if `value` is classified as a `WeakMap` object.
 *
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a weak map, else `false`.
 * @example
 *
 * isWeakMap(new WeakMap)
 * // => true
 *
 * isWeakMap(new Map)
 * // => false
 */
function isWeakMap(value) {
    return isObjectLike(value) && getTag(value) === '[object WeakMap]';
}

export default isWeakMap;
