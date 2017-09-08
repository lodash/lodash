import baseSortBy from './.internal/baseSortBy.js'

function tap(obj, interceptor) {
  interceptor(obj)
  return obj
}

/**
 * This method is like `sortBy` except that it mutates the original array.
 *
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[identity]]
 *  The iteratees to sort by.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns the mutated `array`.
 * @see sortBy
 * @example
 *
 * const users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 34 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 36 }
 * ]
 *
 * inlineSortBy(users, 'user')
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 */
function inlineSortBy(collection, iteratees) {
  if (collection == null) {
    return []
  }
  if (!Array.isArray(iteratees)) {
    iteratees = iteratees == null ? [] : [iteratees]
  }
  return tap(collection, () => baseSortBy(collection, iteratees).forEach((value, index) => {
    collection[index] = value
  }))
}

export default inlineSortBy
