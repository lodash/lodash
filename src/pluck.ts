import map from './map';
import pick from './pick';

/**
 * Creates a collection composed of the picked properties from each `object` of the passed collection.
 *
 * @since 5.0.0
 * @category Collection
 * @param {Array} collection The collection to iterate over.
 * @param {...(string|string[])} [paths] The property paths of each item to pick.
 * @returns {Array} Returns the new array.
 * @example
 *
 * const collection = [ { 'a': 1, 'b': '2', 'c': 3 }, { 'a': 4, 'b': 5, 'c': 6 } ]
 *
 * pluck(collection, ['a', 'c'])
 * // => [ { 'a': 1, 'c': 3 }, { 'a': 4, 'c': 6 } ]
 */
function pluck(collection, ...paths) {
    return map(collection, (item) => pick(item, paths));
}

export default pluck;
