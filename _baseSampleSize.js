import shuffleSelf from './_shuffleSelf.js';
import values from './values.js';

/**
 * The base implementation of `_.sampleSize` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to sample.
 * @param {number} n The number of elements to sample.
 * @returns {Array} Returns the random elements.
 */
function baseSampleSize(collection, n) {
  return shuffleSelf(values(collection), n);
}

export default baseSampleSize;
