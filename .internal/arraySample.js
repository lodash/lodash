import baseRandom from './baseRandom.js';

/**
 * A specialized version of `sample` for arrays.
 *
 * @private
 * @param {Array} array The array to sample.
 * @returns {*} Returns the random element.
 */
function arraySample(array) {
  const length = array.length;
  return length ? array[baseRandom(0, length - 1)] : undefined;
}

export default arraySample;
