import copyArray from './_copyArray.js';
import isArrayLike from './isArrayLike.js';
import shuffleSelf from './_shuffleSelf.js';
import values from './values.js';

/**
 * Creates an array of shuffled values, using a version of the
 * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to shuffle.
 * @returns {Array} Returns the new shuffled array.
 * @example
 *
 * _.shuffle([1, 2, 3, 4]);
 * // => [4, 1, 3, 2]
 */
function shuffle(collection) {
  return shuffleSelf(isArrayLike(collection)
    ? copyArray(collection)
    : values(collection)
  );
}

export default shuffle;
