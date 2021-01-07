import getTag from './.internal/getTag.js'
import isObjectLike from './isObjectLike.js'

/**
 * Checks if `value` is classified as a `WeakSet` object.
 *
 * @since 4.3.0
 * @category Lang
 * @example
 *   isWeakSet(new WeakSet())
 *   // => true
 *
 *   isWeakSet(new Set())
 *   // => false
 *
 * @param {any} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a weak set, else `false`.
 */
function isWeakSet(value) {
  return isObjectLike(value) && getTag(value) == '[object WeakSet]'
}

export default isWeakSet
