define(['./_apply', './_arrayMap', './_baseFlatten', './_baseIteratee', './_baseUnary', './isArray', './_isFlattenableIteratee', './rest'], function(apply, arrayMap, baseFlatten, baseIteratee, baseUnary, isArray, isFlattenableIteratee, rest) {

  /**
   * Creates a function like `_.over`.
   *
   * @private
   * @param {Function} arrayFunc The function to iterate over iteratees.
   * @returns {Function} Returns the new over function.
   */
  function createOver(arrayFunc) {
    return rest(function(iteratees) {
      iteratees = (iteratees.length == 1 && isArray(iteratees[0]))
        ? arrayMap(iteratees[0], baseUnary(baseIteratee))
        : arrayMap(baseFlatten(iteratees, 1, isFlattenableIteratee), baseUnary(baseIteratee));

      return rest(function(args) {
        var thisArg = this;
        return arrayFunc(iteratees, function(iteratee) {
          return apply(iteratee, thisArg, args);
        });
      });
    });
  }

  return createOver;
});
