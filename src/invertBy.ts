/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * This method is like `invert` except that the inverted object is generated
 * from the results of running each element of `object` thru `iteratee`. The
 * corresponding inverted value of each inverted key is an array of keys
 * responsible for generating the inverted value. The iteratee is invoked
 * with one argument: (value).
 *
 * @since 4.1.0
 * @category Object
 * @param {Object} object The object to invert.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {Object} Returns the new inverted object.
 * @example
 *
 * const object = { 'a': 1, 'b': 2, 'c': 1 }
 *
 * invertBy(object, value => `group${value}`)
 * // => { 'group1': ['a', 'c'], 'group2': ['b'] }
 */
function invertBy(object, iteratee) {
    const result = {};
    Object.keys(object).forEach((key) => {
        const value = iteratee(object[key]);
        if (hasOwnProperty.call(result, value)) {
            result[value].push(key);
        } else {
            result[value] = [key];
        }
    });
    return result;
}

export default invertBy;
