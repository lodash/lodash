import shuffleSelf from './shuffleSelf.js';
import values from '../values.js';

/**
 * The base implementation of `shuffle`.
 *
 * @private
 * @param {Array|Object} collection The collection to shuffle.
 * @returns {Array} Returns the new shuffled array.
 */
function baseShuffle(collection) {
  return shuffleSelf(values(collection));
}

export default baseShuffle;
