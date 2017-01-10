import baseSum from './_baseSum.js';
import identity from './identity.js';

/**
 * Computes the sum of the values in `array`.
 *
 * @static
 * @since 3.4.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {number} Returns the sum.
 * @example
 *
 * sum([4, 2, 8, 6]);
 * // => 20
 */
function sum(array) {
  return (array && array.length)
    ? baseSum(array, identity)
    : 0;
}

export default sum;
