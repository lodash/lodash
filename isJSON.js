import isObjectLike from './isObjectLike.js'
import isArrayLike from './isArrayLike.js'

/**
 * This method checks if `value` is JSON-formatted object.
 *
 * @since 4.18.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a JSON object,
 *  else `false`.
 * @example
 *
 * isJSON([1, 2, 3])
 * // => false
 *
 * isJSON({'a': 1, 'b': 2, 'c': 3})
 * // => true
 *
 * isJSON({})
 * // => true
 *
 * isJSON(null)
 * // => false
 */
function isJSON(value) {
  return isObjectLike(value) && !isArrayLike(value) && obj.constructor === {}.constructor
}

export default isJSON
