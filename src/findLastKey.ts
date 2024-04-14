import baseFindKey from './.internal/baseFindKey.js';
import baseForOwnRight from './.internal/baseForOwnRight.js';

/**
 * This method is like `findKey` except that it iterates over elements of
 * a collection in the opposite order.
 *
 * @since 2.0.0
 * @category Object
 * @param {Object} object The object to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {string|undefined} Returns the key of the matched element,
 *  else `undefined`.
 * @see find, findIndex, findKey, findLast, findLastIndex
 * @example
 *
 * const users = {
 *   'barney':  { 'age': 36, 'active': true },
 *   'fred':    { 'age': 40, 'active': false },
 *   'pebbles': { 'age': 1,  'active': true }
 * }
 *
 * findLastKey(users, ({ age }) => age < 40)
 * // => returns 'pebbles' assuming `findKey` returns 'barney'
 */
function findLastKey(object, predicate) {
    return baseFindKey(object, predicate, baseForOwnRight);
}

export default findLastKey;
