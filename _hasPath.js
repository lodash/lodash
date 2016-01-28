define(['./_baseToPath', './isArguments', './isArray', './_isIndex', './_isKey', './isLength', './isString', './last', './_parent'], function(baseToPath, isArguments, isArray, isIndex, isKey, isLength, isString, last, parent) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /**
   * Checks if `path` exists on `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @param {Function} hasFunc The function to check properties.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   */
  function hasPath(object, path, hasFunc) {
    if (object == null) {
      return false;
    }
    var result = hasFunc(object, path);
    if (!result && !isKey(path)) {
      path = baseToPath(path);
      object = parent(object, path);
      if (object != null) {
        path = last(path);
        result = hasFunc(object, path);
      }
    }
    var length = object ? object.length : undefined;
    return result || (
      !!length && isLength(length) && isIndex(path, length) &&
      (isArray(object) || isString(object) || isArguments(object))
    );
  }

  return hasPath;
});
