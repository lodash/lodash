/**
 * Creates a duplicate-free version of an array, using
 * Set object.
 *
 * @since 0.2.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 * @see uniqBy, uniqWith
 * @example
 *
 * uniq([2, 1, 2])
 * // => [2, 1]
 */
function uniq(array) {
  return (array != null && array.length)
    ? Array.from(new Set(array))
    : []
}

export default uniq
