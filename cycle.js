/** Used as references for various `Number` constants. */
const MAX_SAFE_INTEGER = 9007199254740991

/** Used as references for the maximum length and index of an array. */
const MAX_ARRAY_LENGTH = 4294967295

/**
 * Repeats the array within a new array for n times.
 *
 * @since 0.1.0
 * @category Util
 * @param {Array} array The array to cycle.
 * @param {number} n The number of times to invoke `iteratee`.
 * @returns {Array} Returns the array of results.
 * @example
 *
 * cycle([1,2,3], 3)
 * // => [1,2,3,1,2,3,1,2,3]
 *
 */
function cycle(array, n) {
  if (n < 1 || n > MAX_SAFE_INTEGER) {
    return []
  }
  let index = -1
  const length = Math.min(n, MAX_ARRAY_LENGTH)
  let result = []
  while (++index < length) {
    result = result.concat(array)
  }
  return result
}
