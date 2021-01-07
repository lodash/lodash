import isArrayLike from './isArrayLike.js'
import isObjectLike from './isObjectLike.js'

/**
 * This method is like `isArrayLike` except that it also checks if `value` is an object.
 *
 * @since 4.0.0
 * @category Lang
 * @example
 *   isArrayLikeObject([1, 2, 3])
 *   // => true
 *
 *   isArrayLikeObject(document.body.children)
 *   // => true
 *
 *   isArrayLikeObject('abc')
 *   // => false
 *
 *   isArrayLikeObject(Function)
 *   // => false
 *
 * @param {any} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value)
}

export default isArrayLikeObject
