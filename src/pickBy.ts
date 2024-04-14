import map from './map.js';
import basePickBy from './.internal/basePickBy.js';
import getAllKeysIn from './.internal/getAllKeysIn.js';

/**
 * Creates an object composed of the `object` properties `predicate` returns
 * truthy for. The predicate is invoked with two arguments: (value, key).
 *
 * @since 4.0.0
 * @category Object
 * @param {Object} object The source object.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 * @example
 *
 * const object = { 'a': 1, 'b': '2', 'c': 3 }
 *
 * pickBy(object, isNumber)
 * // => { 'a': 1, 'c': 3 }
 */
function pickBy(object, predicate) {
    if (object == null) {
        return {};
    }
    const props = map(getAllKeysIn(object), (prop) => [prop]);
    return basePickBy(object, props, (value, path) => predicate(value, path[0]));
}

export default pickBy;
