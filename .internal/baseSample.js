import arraySample from './arraySample.js';
import values from '../values.js';

/**
 * The base implementation of `sample`.
 *
 * @private
 * @param {Array|Object} collection The collection to sample.
 * @returns {*} Returns the random element.
 */
function baseSample(collection) {
  return arraySample(values(collection));
}

export default baseSample;
