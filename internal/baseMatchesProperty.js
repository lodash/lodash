define(['./baseGet', './baseIsEqual', './baseSlice', '../lang/isArray', './isKey', './isStrictComparable', '../array/last', './toObject', './toPath'], function(baseGet, baseIsEqual, baseSlice, isArray, isKey, isStrictComparable, last, toObject, toPath) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /**
   * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
   *
   * @private
   * @param {string} path The path of the property to get.
   * @param {*} srcValue The value to compare.
   * @returns {Function} Returns the new function.
   */
  function baseMatchesProperty(path, srcValue) {
    var isArr = isArray(path),
        isCommon = isKey(path) && isStrictComparable(srcValue),
        pathKey = (path + '');

    path = toPath(path);
    return function(object) {
      if (object == null) {
        return false;
      }
      var key = pathKey;
      object = toObject(object);
      if ((isArr || !isCommon) && !(key in object)) {
        object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
        if (object == null) {
          return false;
        }
        key = last(path);
        object = toObject(object);
      }
      return object[key] === srcValue
        ? (srcValue !== undefined || (key in object))
        : baseIsEqual(srcValue, object[key], undefined, true);
    };
  }

  return baseMatchesProperty;
});
