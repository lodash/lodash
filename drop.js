import baseSlice from './.internal/baseSlice.js';
import toInteger from './toInteger.js';

/**
 * Creates a slice of `array` with `n` elements dropped from the beginning.
 *
 * @since 0.5.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {number} [n=1] The number of elements to drop.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `map`.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * drop([1, 2, 3]);
 * // => [2, 3]
 *
 * drop([1, 2, 3], 2);
 * // => [3]
 *
 * drop([1, 2, 3], 5);
 * // => []
 *
 * drop([1, 2, 3], 0);
 * // => [1, 2, 3]
 */
function drop(array, n, guard) {
  const length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  n = (guard || n === undefined) ? 1 : toInteger(n);
  return baseSlice(array, n < 0 ? 0 : n, length);
}

export default drop;
