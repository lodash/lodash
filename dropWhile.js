import baseWhile from './_baseWhile.js';

/**
 * Creates a slice of `array` excluding elements dropped from the beginning.
 * Elements are dropped until `predicate` returns falsey. The predicate is
 * invoked with three arguments: (value, index, array).
 *
 * @static
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * dropWhile(users, function(o) { return !o.active; });
 * // => objects for ['pebbles']
 */
function dropWhile(array, predicate) {
  return (array && array.length)
    ? baseWhile(array, predicate, true)
    : [];
}

export default dropWhile;
