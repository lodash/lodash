import arrayPush from './.internal/arrayPush.js';
import baseFlatten from './.internal/baseFlatten.js';
import copyArray from './.internal/copyArray.js';

/**
 * Creates a new array concatenating `array` with any additional arrays
 * and/or values.
 *
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to concatenate.
 * @param {...*} [values] The values to concatenate.
 * @returns {Array} Returns the new concatenated array.
 * @example
 *
 * const array = [1];
 * const other = concat(array, 2, [3], [[4]]);
 *
 * console.log(other);
 * // => [1, 2, 3, [4]]
 *
 * console.log(array);
 * // => [1]
 */
function concat(array, ...values) {
  return arrayPush(Array.isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
}

export default concat;
