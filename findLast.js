import findLastIndex from './findLastIndex.js'
import isArrayLike from './isArrayLike.js'

/**
 * This method is like `find` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @since 2.0.0
 * @category Collection
 * @example
 *   findLast([1, 2, 3, 4], (n) => n % 2 == 1)
 *   // => 3
 *
 * @param {Array | Object} collection The collection to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} [fromIndex] The index to search from. Default is `collection.length-1`
 * @see find, findIndex, findKey, findLastIndex, findLastKey
 * @returns {any} Returns the matched element, else `undefined`.
 */
function findLast(collection, predicate, fromIndex) {
  let iteratee
  const iterable = Object(collection)
  if (!isArrayLike(collection)) {
    collection = Object.keys(collection)
    iteratee = predicate
    predicate = (key) => iteratee(iterable[key], key, iterable)
  }
  const index = findLastIndex(collection, predicate, fromIndex)
  return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined
}

export default findLast
