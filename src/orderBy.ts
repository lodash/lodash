import baseOrderBy from './.internal/baseOrderBy.js';

/**
 * This method is like `sortBy` except that it allows specifying the sort
 * orders of the iteratees to sort by. If `orders` is unspecified, all values
 * are sorted in ascending order. Otherwise, specify an order of "desc" for
 * descending or "asc" for ascending sort order of corresponding values.
 * You may also specify a compare function for an order.
 *
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[identity]]
 *  The iteratees to sort by.
 * @param {(string|function)[]} [orders] The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 * @see reverse
 * @example
 *
 * const users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 34 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 36 }
 * ]
 *
 * // Sort by `user` in ascending order and by `age` in descending order.
 * orderBy(users, ['user', 'age'], ['asc', 'desc'])
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 *
 * // Sort by `user` then by `age` using custom compare functions for each
 * orderBy(users, ['user', 'age'], [
 *   (a, b) => a.localeCompare(b, 'de', { sensitivity: 'base' }),
 *   (a, b) => a - b,
 * ])
 *
 */
function orderBy(collection, iteratees, orders) {
    if (collection == null) {
        return [];
    }
    if (!Array.isArray(iteratees)) {
        iteratees = iteratees == null ? [] : [iteratees];
    }
    if (!Array.isArray(orders)) {
        orders = orders == null ? [] : [orders];
    }
    return baseOrderBy(collection, iteratees, orders);
}

export default orderBy;
