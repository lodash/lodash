/**
 * It swaps items at position _i_ and _j_ in the **array**.
 * @param {Array} array Input array to swap items in it
 * @param {Number} i
 * @param {Number} j
 */
function swap(array, i, j) {
  const temp = array[i]
  array[i] = array[j]
  array[j] = temp
}

/**
 * Computes the _kth_ smallest element in an unordered array.
 * @param {Array} array The array to query.
 * @param {Number} k The index of the nth smallest element to return.
 * @param {Number} l The index of the most left element in the array.
 * @param {Number} r The index of the most right element in the array.
 * @returns {Number | undefined} _kth_ smallest element in the input array.
 */
function quickSelect(array, k, l = 0, r = array.length - 1) {
  if (r < l || k < l || k > r) {
    return
  }

  const randomPivotIndex = Math.floor(Math.random() * (r - l) + l)
  swap(array, l, randomPivotIndex)
  const pivot = array[l]
  let i = l + 1

  for (let j = l + 1; j < r + 1; j++) {
    if (array[j] < pivot) {
      swap(array, j, i)
      i = i + 1
    }
  }

  swap(array, l, i - 1)

  if (k === i - 1) {
    return array[i - 1]
  } else if (k > i - 1) {
    return quickSelect(array, k, i, r)
  }

  return quickSelect(array, k, l, i - 2)
}

/**
 * Computes the _nth_ smallest element in an unordered array. If array is empty or falsy, undefined is returned.
 * If the index is out of range, undefined is returned.
 * @category Math
 * @param {Array} array The array to query.
 * @param {Number} n The index of the nth smallest element to return.
 * @returns {Number | undefined} _nth_ smallest element in the input array.
 * @example
 *
 * const array = [4, 2, 8, 6]
 *
 * nthOrderStatistic(array, 1)
 * // => 4
 *
 * nthOrderStatistic(array, 10)
 * // => undefined
 *
 * nthOrderStatistic([], 0)
 * // => undefined
 */
function nthOrderStatistic(array, n) {
  if (!Array.isArray(array) || !array || !array.length) {
    return undefined
  }

  const tempArray = [...array]
  return quickSelect(tempArray, n)
}

export default nthOrderStatistic
