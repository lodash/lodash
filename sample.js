define(['./_baseRandom', './isArrayLike', './values'], function(baseRandom, isArrayLike, values) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /**
   * Gets a random element from `collection`.
   *
   * @static
   * @memberOf _
   * @category Collection
   * @param {Array|Object} collection The collection to sample.
   * @returns {*} Returns the random element.
   * @example
   *
   * _.sample([1, 2, 3, 4]);
   * // => 2
   */
  function sample(collection) {
    var array = isArrayLike(collection) ? collection : values(collection),
        length = array.length;

    return length > 0 ? array[baseRandom(0, length - 1)] : undefined;
  }

  return sample;
});
