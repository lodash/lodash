import baseWhile from './.internal/baseWhile.js';

/**
 * Creates a slice of `array` with elements taken from the beginning. Elements
 * are taken until `predicate` returns falsey. The predicate is invoked with
 * three arguments: (value, index, array).
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * const users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * takeWhile(users, o => !o.active);
 * // => objects for ['barney', 'fred']
 */
function takeWhile(array, predicate) {
  return (array && array.length)
    ? baseWhile(array, predicate)
    : [];
}

export default takeWhile;
