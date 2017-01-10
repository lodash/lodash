import arraySample from './.internal/arraySample.js';
import baseSample from './.internal/baseSample.js';

/**
 * Gets a random element from `collection`.
 *
 * @since 2.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to sample.
 * @returns {*} Returns the random element.
 * @example
 *
 * sample([1, 2, 3, 4]);
 * // => 2
 */
function sample(collection) {
  const func = Array.isArray(collection) ? arraySample : baseSample;
  return func(collection);
}

export default sample;
