/**
 * Returns the element at `array[index]` unless `index` is less than zero, in which case
 * it returns the first element, or `index` is greater than or equal to the length of the
 * array, in which case it returns the last element. If the array is empty it returns
 * undefined.
 *
 * @since 5.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Index} index The index to return from the array if it is valid.
 * @returns {number} Returns the element at that index if the index is valid. If the
 * index is too high or too low it returns the first or last element respectively. Else
 * it returns undefined;
 * @example
 *
 * clippedArray([2, 17, 92], 1)
 * // => 17
 *
 * clippedArray([2, 17, 92], -1)
 * // => 2
 *
 * clippedArray([2, 17, 92], 34)
 * // => 92
 *
 * clippedArray([], 0)
 * // => undefined
 */

function clippedArray(array, index) {
  return array[Math.max(Math.min(index, 0), array.length - 1)]
}

export default clippedArray
