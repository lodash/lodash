import findIndex from './findIndex.js'
import isArrayLike from './isArrayLike'
import keys from './keys'

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {*} Returns the matched element, else `undefined`.
 * @see findIndex, findKey, findLast, findLastIndex, findLastKey
 * @example
 *
 * const users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ]
 *
 * find(users, ({ age }) => age < 40)
 * // => object for 'barney'
 */
function find(collection, predicate, fromIndex) {
  let iteratee
  const iterable = Object(collection)

  if (!isArrayLike(collection)) {
    collection = keys(collection)
    iteratee = (key) => predicate(iterable[key], key, iterable)
  }
  const index = findIndex(collection, predicate, fromIndex)
  return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined
}

export default find
