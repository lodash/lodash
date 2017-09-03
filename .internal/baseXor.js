import baseDifference from './baseDifference.js'
import baseFlatten from './baseFlatten.js'
import baseUniq from './baseUniq.js'

/**
 * The base implementation of methods like `xor` which accepts an array of
 * arrays to inspect.
 *
 * @private
 * @param {Array} arrays The arrays to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of values.
 */
function baseXor(arrays, iteratee, comparator) {
  const length = arrays.length
  if (length < 2) {
    return length ? baseUniq(arrays[0]) : []
  }
  let index = -1
  let result = []

  while (++index < length) {
    result = baseFlatten([
      baseDifference(result, arrays[index], iteratee, comparator),
      baseDifference(arrays[index], result, iteratee, comparator)
    ], 1)
  }
  return baseUniq(result, iteratee, comparator)
}

export default baseXor
