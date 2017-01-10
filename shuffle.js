import arrayShuffle from './.internal/arrayShuffle.js';
import baseShuffle from './.internal/baseShuffle.js';

/**
 * Creates an array of shuffled values, using a version of the
 * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
 *
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to shuffle.
 * @returns {Array} Returns the new shuffled array.
 * @example
 *
 * shuffle([1, 2, 3, 4]);
 * // => [4, 1, 3, 2]
 */
function shuffle(collection) {
  const func = Array.isArray(collection) ? arrayShuffle : baseShuffle;
  return func(collection);
}

export default shuffle;
