import copyArray from './.internal/copyArray'

/**
 * Swap elements position of array that has no side-effect.
 *
 * @since 5.1.0
 * @category Array
 * @param {Array} array The array to swap
 * @param {number)} i The first index to swap.
 * @param {number} j The second index to swap.
 * @returns {Array} Returns the array after swapped.
 * @example
 *
 * const array = [1, 2, 3]
 * swap(array, 0, 2)
 * // => [3, 2, 1]
 * 
 * const array = [{ a: 1 }, { b: 2 }, { c: 3}]
 * swap(array, 1, 2)
 * // => [{ c: 1 }, { c: 3 }, { b: 2}]
 */
function swap(array, i, j) {
  i = i > 0 ? i : 0
  j = j > 0 ? j : 0

  const tmp = array[i]
  const result = copyArray(array)
  bk[i] = bk[j]
  bk[j] = tmp
  
  return result
}

export default swap
