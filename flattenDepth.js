import baseFlatten from './.internal/baseFlatten.js'

/**
 * Recursively flatten `array` up to `depth` times.
 *
 * @since 4.4.0
 * @category Array
 * @example
 *   const array = [1, [2, [3, [4]], 5]]
 *
 *   flattenDepth(array, 1)
 *   // => [1, 2, [3, [4]], 5]
 *
 *   flattenDepth(array, 2)
 *   // => [1, 2, 3, [4], 5]
 *
 * @param {Array} array The array to flatten.
 * @param {number} [depth] The maximum recursion depth. Default is `1`
 * @see flatMap, flatMapDeep, flatMapDepth, flattenDeep
 * @returns {Array} Returns the new flattened array.
 */
function flattenDepth(array, depth) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  depth = depth === undefined ? 1 : +depth
  return baseFlatten(array, depth)
}

export default flattenDepth
