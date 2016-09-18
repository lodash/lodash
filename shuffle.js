var copyArray = require('./_copyArray'),
    isArrayLike = require('./isArrayLike'),
    shuffleSelf = require('./_shuffleSelf'),
    values = require('./values');

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

module.exports = shuffle;
