import baseWhile from './.internal/baseWhile.js'

/**
 * Creates a slice of `array` with elements taken from the beginning. Elements
 * are taken until `predicate` returns falsey. The predicate is invoked with
 * three arguments: (value, index, array).
 *
 * @since 3.0.0
 * @category Array
 * @example
 *   const users = [
 *     { user: 'barney', active: true },
 *     { user: 'fred', active: true },
 *     { user: 'pebbles', active: false }
 *   ]
 *
 *   takeWhile(users, ({ active }) => active)
 *   // => objects for ['barney', 'fred']
 *
 * @param {Array} array The array to query.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the slice of `array`.
 */
function takeWhile(array, predicate) {
  return array != null && array.length ? baseWhile(array, predicate) : []
}

export default takeWhile
