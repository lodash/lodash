import baseWhile from './.internal/baseWhile.js'

/**
 * Creates a slice of `array` excluding elements dropped from the beginning and end.
 * Elements are dropped until `predicate` returns falsey. The predicate is
 * invoked with three arguments: (value, index, array).
 *
 * @since 5.0.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * const users = [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'pebbles', 'active': false },
 *   { 'user': 'fred',    'active': true }
 * ]
 *
 * dropEndsWhile(users, ({ active }) => active)
 * // => objects for ['pebbles']
 */
function dropEndsWhile(array, predicate) {
  return (array != null && array.length)
    ? baseWhile(baseWhile(array, predicate, true), predicate, true, true)
    : []
}

export default dropEndsWhile
