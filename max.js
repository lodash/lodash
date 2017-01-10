import baseExtremum from './.internal/baseExtremum.js';
import baseGt from './.internal/baseGt.js';
import identity from './identity.js';

/**
 * Computes the maximum value of `array`. If `array` is empty or falsey,
 * `undefined` is returned.
 *
 * @since 0.1.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {*} Returns the maximum value.
 * @example
 *
 * max([4, 2, 8, 6]);
 * // => 8
 *
 * max([]);
 * // => undefined
 */
function max(array) {
  return (array && array.length)
    ? baseExtremum(array, identity, baseGt)
    : undefined;
}

export default max;
