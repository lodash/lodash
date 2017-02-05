import createFind from './.internal/createFind.js'
import findLastIndex from './findLastIndex.js'

/**
 * This method is like `find` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @since 2.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} [fromIndex=collection.length-1] The index to search from.
 * @returns {*} Returns the matched element, else `undefined`.
 * @see find, findIndex, findKey, findLastIndex, findLastKey
 * @example
 *
 * findLast([1, 2, 3, 4], n => n % 2 == 1)
 * // => 3
 */
const findLast = createFind(findLastIndex)

export default findLast
