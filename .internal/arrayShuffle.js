import copyArray from './copyArray.js';
import shuffleSelf from './shuffleSelf.js';

/**
 * A specialized version of `shuffle` for arrays.
 *
 * @private
 * @param {Array} array The array to shuffle.
 * @returns {Array} Returns the new shuffled array.
 */
function arrayShuffle(array) {
  return shuffleSelf(copyArray(array));
}

export default arrayShuffle;
