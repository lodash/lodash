import eq from '../eq.js'

/**
 * The base implementation of `sortedUniq` and `sortedUniqBy`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseSortedUniq(array, iteratee) {
  let seen
  let index = -1
  let resIndex = 0

  const { length } = array
  const result = []

  while (++index < length) {
    const value = array[index], computed = iteratee ? iteratee(value) : value
    if (!index || !eq(computed, seen)) {
      seen = computed
      result[resIndex++] = value === 0 ? 0 : value
    }
  }
  return result
}

export default baseSortedUniq
