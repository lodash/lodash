var arraySample = require('./_arraySample'),
    isArrayLike = require('./isArrayLike'),
    values = require('./values');

/**
 * Gets a random element from `collection`.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to sample.
 * @returns {*} Returns the random element.
 * @example
 *
 * _.sample([1, 2, 3, 4]);
 * // => 2
 */
function sample(collection) {
  return arraySample(isArrayLike(collection) ? collection : values(collection));
}

module.exports = sample;
