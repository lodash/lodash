import arrayFilter from './.internal/arrayFilter.js';
import baseFilter from './.internal/baseFilter.js';
import negate from './negate.js';

/**
 * The opposite of `filter`; this method returns the elements of `collection`
 * that `predicate` does **not** return truthy for.
 *
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 * @see filter
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': false },
 *   { 'user': 'fred',   'age': 40, 'active': true }
 * ];
 *
 * reject(users, function(o) { return !o.active; });
 * // => objects for ['fred']
 */
function reject(collection, predicate) {
  const func = Array.isArray(collection) ? arrayFilter : baseFilter;
  return func(collection, negate(predicate));
}

export default reject;
