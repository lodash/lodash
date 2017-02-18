import reduce from './reduce.js'

/**
 * Creates an array of elements split into two groups, the first of which
 * contains elements `predicate` returns truthy for, the second of which
 * contains elements `predicate` returns falsey for. The predicate is
 * invoked with one argument: (value).
 *
 * @since 3.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the array of grouped elements.
 * @see groupBy, keyBy
 * @example
 *
 * const users = [
 *   { 'user': 'barney',  'age': 36, 'active': false },
 *   { 'user': 'fred',    'age': 40, 'active': true },
 *   { 'user': 'pebbles', 'age': 1,  'active': false }
 * ]
 *
 * partition(users, ({ active }) => active)
 * // => objects for [['fred'], ['barney', 'pebbles']]
 */
function partition(collection, predicate) {
  return reduce(collection, (result, value, key) => (
    result[predicate(value) ? 0 : 1].push(value), result
  ), [[], []])
}

export default partition
