var baseRandom = require('./_baseRandom');

/**
 * A specialized version of `_.sample` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} array The array to sample.
 * @returns {*} Returns the random element.
 */
function arraySample(array) {
  var length = array.length;
  return length ? array[baseRandom(0, length - 1)] : undefined;
}

module.exports = arraySample;
