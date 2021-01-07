import isIndex from './.internal/isIndex.js'

/**
 * Gets the element at index `n` of `array`. If `n` is negative, the nth
 * element from the end is returned.
 *
 * @since 4.11.0
 * @category Array
 * @example
 *   const array = ['a', 'b', 'c', 'd']
 *
 *   nth(array, 1)
 *   // => 'b'
 *
 *   nth(array, -2)
 *   // => 'c'
 *
 * @param {Array} array The array to query.
 * @param {number} [n] The index of the element to return. Default is `0`
 * @returns {any} Returns the nth element of `array`.
 */
function nth(array, n) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return
  }
  n += n < 0 ? length : 0
  return isIndex(n, length) ? array[n] : undefined
}

export default nth
