define(['./_baseIteratee', './isArrayLike', './keys'], function(baseIteratee, isArrayLike, keys) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /**
   * Creates a `_.find` or `_.findLast` function.
   *
   * @private
   * @param {Function} findIndexFunc The function to find the collection index.
   * @returns {Function} Returns the new find function.
   */
  function createFind(findIndexFunc) {
    return function(collection, predicate, fromIndex) {
      var iterable = Object(collection);
      predicate = baseIteratee(predicate, 3);
      if (!isArrayLike(collection)) {
        var props = keys(collection);
      }
      var index = findIndexFunc(props || collection, function(value, key) {
        if (props) {
          key = value;
          value = iterable[key];
        }
        return predicate(value, key, iterable);
      }, fromIndex);
      return index > -1 ? collection[props ? props[index] : index] : undefined;
    };
  }

  return createFind;
});
