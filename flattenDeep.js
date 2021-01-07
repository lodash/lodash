import baseFlatten from './.internal/baseFlatten.js'

/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0

/**
 * Recursively flattens `array`.
 *
 * @since 3.0.0
 * @category Array
 * @example
 *   flattenDeep([1, [2, [3, [4]], 5]])
 *   // => [1, 2, 3, 4, 5]
 *
 * @param {Array} array The array to flatten.
 * @see flatMap, flatMapDeep, flatMapDepth, flatten, flattenDepth
 * @returns {Array} Returns the new flattened array.
 */
function flattenDeep(array) {
  const length = array == null ? 0 : array.length
  return length ? baseFlatten(array, INFINITY) : []
}

export default flattenDeep
