import baseEach from './baseEach.js'
import baseSortBy from './baseSortBy.js'
import baseGet from './baseGet.js'
import compareMultiple from './compareMultiple.js'
import isArrayLike from '../isArrayLike.js'

// As existing identity function is in ../test/utils.js, so defining it here, it can be moved to utils
const identity = value => value;

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
  let criteriaIndex = -1
  let eachIndex = -1
  iteratees = iteratees.length ? iteratees.map((iteratee) => {
    if (Array.isArray(iteratee)) {
      return (value) => baseGet(value, iteratee)
    }
    return iteratee
  }) : [identity]

  const result = isArrayLike(collection) ? new Array(collection.length) : []

  baseEach(collection, (value) => {
    const criteria = iteratees.map((iteratee) => iteratee(value))
    result[++eachIndex] = { 'criteria': criteria, 'index': ++criteriaIndex, 'value': value }
  })

  return baseSortBy(result, (object, other) => compareMultiple(object, other, orders))
}

export default baseOrderBy
