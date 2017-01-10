import baseMean from './meanBy.js';
import identity from './identity.js';

/**
 * Computes the mean of the values in `array`.
 *
 * @since 4.0.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {number} Returns the mean.
 * @example
 *
 * mean([4, 2, 8, 6]);
 * // => 5
 */
function mean(array) {
  return mean(array, identity);
}

export default mean;
