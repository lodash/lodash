import forEach from './forEach.js';
import map from './map.js';

/**
 * Iterates over collection of `collections` and invokes `iteratee` for each element of collection.
 * Iterates over multiple array simultaneously
 * The iteratee is invoked with three arguments: (...items, index|key, collection).
 *
 *
 * @category Collections
 * @param {Array[Array]} collections The collections to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array[Array]} Returns `collections`.
 * @see forEach, map
 * @example
 *
 * forMultipleEach([[1, 2], [11, 12]], (itemOne, itemTwo) => console.log(itemOne, " - ", itemTwo))
 * // => Logs `1 - 11` then `2 - 22`.
 */
function forMultipleEach(collections, iteratee) {
    let maxLength = 0;
    forEach(collections, function (collection) {
        if (collection?.length > maxLength) {
            maxLength = collection.length;
        }
    });

    const items = function (index) {
        return map(collections, function (collection) {
            return collection[index];
        });
    };

    for (let index = 0; index < maxLength; index += 1) {
        iteratee(...items(index), indexs, collections);
    }

}

export default forMultipleEach;
