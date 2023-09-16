import baseXor from './.internal/baseXor.js';
import isArrayLikeObject from './isArrayLikeObject.js';
import last from './last.js';

/**
 * This method is like `xor` except that it accepts `iteratee` which is
 * invoked for each element of each `arrays` to generate the criterion by
 * which they're compared. The order of result values is determined
 * by the order they occur in the arrays. The iteratee is invoked with one
 * argument: (value).
 *
 * @since 4.0.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 * @see difference, union, unionBy, unionWith, without, xor, xorWith
 * @example
 *
 * xorBy([2.1, 1.2], [2.3, 3.4], Math.floor)
 * // => [1.2, 3.4]
 */
function xorBy(...arrays) {
    let iteratee = last(arrays);
    if (isArrayLikeObject(iteratee)) {
        iteratee = undefined;
    }
    return baseXor(arrays.filter(isArrayLikeObject), iteratee);
}

export default xorBy;
