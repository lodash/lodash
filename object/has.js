define(['../internal/baseGet', '../internal/baseSlice', '../lang/isArguments', '../lang/isArray', '../internal/isIndex', '../internal/isKey', '../internal/isLength', '../array/last', '../internal/toPath'], function(baseGet, baseSlice, isArguments, isArray, isIndex, isKey, isLength, last, toPath) {

  /** Used for native method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Checks if `path` is a direct property.
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @returns {boolean} Returns `true` if `path` is a direct property, else `false`.
   * @example
   *
   * var object = { 'a': { 'b': { 'c': 3 } } };
   *
   * _.has(object, 'a');
   * // => true
   *
   * _.has(object, 'a.b.c');
   * // => true
   *
   * _.has(object, ['a', 'b', 'c']);
   * // => true
   */
  function has(object, path) {
    if (object == null) {
      return false;
    }
    var result = hasOwnProperty.call(object, path);
    if (!result && !isKey(path)) {
      path = toPath(path);
      object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
      if (object == null) {
        return false;
      }
      path = last(path);
      result = hasOwnProperty.call(object, path);
    }
    return result || (isLength(object.length) && isIndex(path, object.length) &&
      (isArray(object) || isArguments(object)));
  }

  return has;
});
