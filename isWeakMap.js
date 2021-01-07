import getTag from './.internal/getTag.js'
import isObjectLike from './isObjectLike.js'

/**
 * Checks if `value` is classified as a `WeakMap` object.
 *
 * @since 4.3.0
 * @category Lang
 * @example
 *   isWeakMap(new WeakMap())
 *   // => true
 *
 *   isWeakMap(new Map())
 *   // => false
 *
 * @param {any} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a weak map, else `false`.
 */
function isWeakMap(value) {
  return isObjectLike(value) && getTag(value) == '[object WeakMap]'
}

export default isWeakMap
