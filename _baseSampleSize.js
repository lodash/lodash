var shuffleSelf = require('./_shuffleSelf'),
    values = require('./values');

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

module.exports = baseSampleSize;
