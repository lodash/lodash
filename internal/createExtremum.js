define(['./arrayExtremum', './baseCallback', './baseExtremum', '../lang/isArray', './isIterateeCall', './toIterable'], function(arrayExtremum, baseCallback, baseExtremum, isArray, isIterateeCall, toIterable) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /**
   * Creates a `_.max` or `_.min` function.
   *
   * @private
   * @param {Function} comparator The function used to compare values.
   * @param {*} exValue The initial extremum value.
   * @returns {Function} Returns the new extremum function.
   */
  function createExtremum(comparator, exValue) {
    return function(collection, iteratee, thisArg) {
      if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
        iteratee = undefined;
      }
      iteratee = baseCallback(iteratee, thisArg, 3);
      if (iteratee.length == 1) {
        collection = isArray(collection) ? collection : toIterable(collection);
        var result = arrayExtremum(collection, iteratee, comparator, exValue);
        if (!(collection.length && result === exValue)) {
          return result;
        }
      }
      return baseExtremum(collection, iteratee, comparator, exValue);
    };
  }

  return createExtremum;
});
