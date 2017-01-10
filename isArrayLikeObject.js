import isArrayLike from './isArrayLike.js';
import isObjectLike from './isObjectLike.js';

/**
 * This method is like `isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * isArrayLikeObject(document.body.children);
 * // => true
 *
 * isArrayLikeObject('abc');
 * // => false
 *
 * isArrayLikeObject(noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

export default isArrayLikeObject;
