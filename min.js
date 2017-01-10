import baseExtremum from './.internal/baseExtremum.js';
import baseLt from './.internal/baseLt.js';
import identity from './identity.js';

/**
 * Computes the minimum value of `array`. If `array` is empty or falsey,
 * `undefined` is returned.
 *
 * @since 0.1.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {*} Returns the minimum value.
 * @example
 *
 * min([4, 2, 8, 6]);
 * // => 2
 *
 * min([]);
 * // => undefined
 */
function min(array) {
  return (array && array.length)
    ? baseExtremum(array, identity, baseLt)
    : undefined;
}

export default min;
