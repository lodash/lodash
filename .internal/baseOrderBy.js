import baseEach from './baseEach.js'
import baseSortBy from './baseSortBy.js'
import baseGet from './baseGet.js'
import compareMultiple from './compareMultiple.js'
import isArrayLike from '../isArrayLike.js'

const identity = (value) => value

/**
 * The base implementation of `orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
function baseOrderBy(collection, iteratees, orders) {
  if (iteratees.length) {
    iteratees = iteratees.map((iteratee) => {
      if (Array.isArray(iteratee)) {
        return (value) => baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee)
      }

      return iteratee
    })
  } else {
    iteratees = [identity]
  }

  let criteriaIndex = -1
  let eachIndex = -1

  const result = isArrayLike(collection) ? new Array(collection.length) : []

  baseEach(collection, (value) => {
    const criteria = iteratees.map((iteratee) => iteratee(value))

    result[++eachIndex] = {
      criteria,
      index: ++criteriaIndex,
      value
    }
  })

  return baseSortBy(result, (object, other) => compareMultiple(object, other, orders))
}

export default baseOrderBy
