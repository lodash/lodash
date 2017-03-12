import baseForOwn from './baseForOwn.js'
import isArrayLike from '../isArrayLike.js'

/**
 * The base implementation of `forEach`.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
function baseEach(collection, iteratee) {
  if (collection == null) {
    return collection
  }
  if (!isArrayLike(collection)) {
    return baseForOwn(collection, iteratee)
  }
  const length = collection.length
  const iterable = Object(collection)
  let index = -1

  while (++index < length) {
    if (iteratee(iterable[index], index, iterable) === false) {
      break
    }
  }
  return collection
}

export default baseEach
