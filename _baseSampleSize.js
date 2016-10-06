define(['./_baseClamp', './_shuffleSelf', './values'], function(baseClamp, shuffleSelf, values) {

  /**
   * The base implementation of `_.sampleSize` without param guards.
   *
   * @private
   * @param {Array|Object} collection The collection to sample.
   * @param {number} n The number of elements to sample.
   * @returns {Array} Returns the random elements.
   */
  function baseSampleSize(collection, n) {
    var array = values(collection);
    return shuffleSelf(array, baseClamp(n, 0, array.length));
  }

  return baseSampleSize;
});
