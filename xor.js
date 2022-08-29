import baseXor from './.internal/baseXor.js'
import isArrayLikeObject from './isArrayLikeObject.js'

/**
 * Creates an array of unique values that is the
 * [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
 * of the given arrays, for 1 or 2 arrays. The order of result values is
 * determined by the order they occur in the arrays.
 *
 * **Note:** Unlike the _n_-ary specification of symmetric difference, this
 * implementation does not return elements that appear any odd number of times,
 * but only elements that appear precisely once.
 *
 * @since 2.4.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of filtered values.
 * @see difference, union, unionBy, unionWith, without, xorBy, xorWith
 * @example
 * 
 * xor([2, 1])
 * // => [2, 1]
 *
 * xor([2, 1], [2, 3])
 * // => [1, 3]
 * 
 * // Non-spec n-ary behavior: `2` is not included in output.
 * xor([2, 1], [2, 3], [2, 4])
 * // => [1, 3, 4]
 */
function xor(...arrays) {
  return baseXor(arrays.filter(isArrayLikeObject))
}

export default xor
