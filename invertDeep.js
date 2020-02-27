import transform from './transform.js'
import isPlainObject from './isPlainObject.js'

/**
 * Creates an object composed of the inverted keys and values of nested `object`.
 * If `object` contains duplicate values, subsequent values overwrite
 * property assignments of previous values.
 *
 * @since x.x.x
 * @category Object
 * @param {Object} object The object to invertDeep.
 * @returns {Object} Returns the new inverted nested object.
 * @example
 *
 * const object = { 'x': 1, 'y': 2, 'nested': { 'a': 8, 'b': 9, 'nested2': { 'p': 10, 'q': 11 } }
}
 *
 * invertDeep(object)
 * // => { '1': 'x', '2': 'y', 'nested': { '8': 'a', '9': 'b', 'nested2' :{ '10': 'p', '11': 'q'}}}
 */
function invertDeep(object) {
    return _.transform(object, (result, val, key) => {
        if(_.isPlainObject(val)) {
            result[key] = invertDeep(val);
        } else {
            result[val] = key;
        }
    });
}

export default invertDeep