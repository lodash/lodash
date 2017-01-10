import baseSlice from './.internal/baseSlice.js';
import toInteger from './toInteger.js';

/**
 * Creates a slice of `array` with `n` elements taken from the end.
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {number} [n=1] The number of elements to take.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `map`.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * takeRight([1, 2, 3]);
 * // => [3]
 *
 * takeRight([1, 2, 3], 2);
 * // => [2, 3]
 *
 * takeRight([1, 2, 3], 5);
 * // => [1, 2, 3]
 *
 * takeRight([1, 2, 3], 0);
 * // => []
 */
function takeRight(array, n, guard) {
  const length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  n = (guard || n === undefined) ? 1 : toInteger(n);
  n = length - n;
  return baseSlice(array, n < 0 ? 0 : n, length);
}

export default takeRight;
