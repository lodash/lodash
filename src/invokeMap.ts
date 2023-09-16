import baseEach from './.internal/baseEach.js';
import invoke from './invoke.js';
import isArrayLike from './isArrayLike.js';

/**
 * Invokes the method at `path` of each element in `collection`, returning
 * an array of the results of each invoked method. Any additional arguments
 * are provided to each invoked method. If `path` is a function, it's invoked
 * for, and `this` bound to, each element in `collection`.
 *
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Array|Function|string} path The path of the method to invoke or
 *  the function invoked per iteration.
 * @param {Array} [args] The arguments to invoke each method with.
 * @returns {Array} Returns the array of results.
 * @example
 *
 * invokeMap([[5, 1, 7], [3, 2, 1]], 'sort')
 * // => [[1, 5, 7], [1, 2, 3]]
 *
 * invokeMap([123, 456], String.prototype.split, [''])
 * // => [['1', '2', '3'], ['4', '5', '6']]
 */
function invokeMap(collection, path, args) {
    let index = -1;
    const isFunc = typeof path === 'function';
    const result = isArrayLike(collection) ? new Array(collection.length) : [];

    baseEach(collection, (value) => {
        result[++index] = isFunc ? path.apply(value, args) : invoke(value, path, args);
    });
    return result;
}

export default invokeMap;
