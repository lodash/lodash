import unzipWith from './unzipWith.js';

/**
 * This method is like `zip` except that it accepts `iteratee` to specify
 * how grouped values should be combined. The iteratee is invoked with the
 * elements of each group: (...group).
 *
 * @since 3.8.0
 * @category Array
 * @param {...Array} [arrays] The arrays to process.
 * @param {Function} iteratee The function to combine
 *  grouped values.
 * @returns {Array} Returns the new array of grouped elements.
 * @see unzip, unzipWith, zip, zipObject, zipObjectDeep, zipWith
 * @example
 *
 * zipWith([1, 2], [10, 20], [100, 200], (a, b, c) => a + b + c)
 * // => [111, 222]
 */
function zipWith(...arrays) {
    const length = arrays.length;
    let iteratee = length > 1 ? arrays[length - 1] : undefined;
    iteratee = typeof iteratee === 'function' ? (arrays.pop(), iteratee) : undefined;
    return unzipWith(arrays, iteratee);
}

export default zipWith;
