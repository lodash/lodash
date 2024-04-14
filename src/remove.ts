import basePullAt from './.internal/basePullAt.js';

/**
 * Removes all elements from `array` that `predicate` returns truthy for
 * and returns an array of the removed elements. The predicate is invoked
 * with three arguments: (value, index, array).
 *
 * **Note:** Unlike `filter`, this method mutates `array`. Use `pull`
 * to pull elements from an array by value.
 *
 * @since 2.0.0
 * @category Array
 * @param {Array} array The array to modify.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new array of removed elements.
 * @see pull, pullAll, pullAllBy, pullAllWith, pullAt, reject, filter
 * @example
 *
 * const array = [1, 2, 3, 4]
 * const evens = remove(array, n => n % 2 === 0)
 *
 * console.log(array)
 * // => [1, 3]
 *
 * console.log(evens)
 * // => [2, 4]
 */
function remove(array, predicate) {
    const result = [];
    if (!(array != null && array.length)) {
        return result;
    }
    let index = -1;
    const indexes = [];
    const { length } = array;

    while (++index < length) {
        const value = array[index];
        if (predicate(value, index, array)) {
            result.push(value);
            indexes.push(index);
        }
    }
    basePullAt(array, indexes);
    return result;
}

export default remove;
