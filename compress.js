import isPlainObject from './isPlainObject.js'
import isNull from './isNull.js'
import isEmpty from './isEmpty.js'
import reduce from './reduce.js'

/**
 * Creates compressed version of the given object
 * by running each own enumerable string keyed property of `object` thru
 * `iteratee`. The iteratee is invoked with the following arguments, and
 * it is for filtering the bad values out:
 * (value).
 *
 * Clears Null, `undefined`, and empty values out of the given object,
 * if no `iteratee` is given
 *
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns the new mapped object.
 * @see compact
 * @example
 *
 * const users = {
 *   'fred': null,
 *   'pebbles': { 'user': 'pebbles', 'age': undefined }
 *   'alfred': [{'user': 'alfred', 'age': {}}]
 *   'menezes': []
 * }
 *
 * mapValue(users)
 * // => { 'pebbles': { 'user': 'pebbles' }, 'alfred': [{'user': 'alfred', 'age': {}}] }
 */

const compress = (object, iteratee) => {

    iteratee = iteratee || (element) => {
        return isNull(element) || element === undefined || isEmpty(element);
    };

    return reduce(object, (compressed, value, key) => {
        if (isPlainObject(value)) value = compress(value, iteratee);
        if (!iteratee(value)) compressed[key] = value;
        return compressed;
    }, {});

};

export default compress
