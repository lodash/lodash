import arrayFilter from './.internal/arrayFilter.js';
import baseFilter from './.internal/baseFilter.js';

/**
 * Iterates over elements of `collection`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * **Note:** Unlike `remove`, this method returns a new array.
 *
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 * @see pull, pullAll, pullAllBy, pullAllWith, pullAt, remove, reject
 * @example
 *
 * const users = [
 *   { 'user': 'barney', 'active': true },
 *   { 'user': 'fred',   'active': false }
 * ];
 *
 * filter(users, ({ active }) => active);
 * // => objects for ['barney']
 */
function filter(collection, predicate) {
  const func = Array.isArray(collection) ? arrayFilter : baseFilter;
  return func(collection, predicate);
}

export default filter;
