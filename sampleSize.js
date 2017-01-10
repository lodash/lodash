import arraySampleSize from './.internal/arraySampleSize.js';
import baseSampleSize from './.internal/baseSampleSize.js';
import isIterateeCall from './.internal/isIterateeCall.js';
import toInteger from './toInteger.js';

/**
 * Gets `n` random elements at unique keys from `collection` up to the
 * size of `collection`.
 *
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to sample.
 * @param {number} [n=1] The number of elements to sample.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `map`.
 * @returns {Array} Returns the random elements.
 * @example
 *
 * sampleSize([1, 2, 3], 2);
 * // => [3, 1]
 *
 * sampleSize([1, 2, 3], 4);
 * // => [2, 3, 1]
 */
function sampleSize(collection, n, guard) {
  if ((guard ? isIterateeCall(collection, n, guard) : n === undefined)) {
    n = 1;
  } else {
    n = toInteger(n);
  }
  const func = Array.isArray(collection) ? arraySampleSize : baseSampleSize;
  return func(collection, n);
}

export default sampleSize;
