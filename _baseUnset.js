define(['./_castPath', './_isKey', './last', './_parent', './_toKey'], function(castPath, isKey, last, parent, toKey) {

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * The base implementation of `_.unset`.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {Array|string} path The path of the property to unset.
   * @returns {boolean} Returns `true` if the property is deleted, else `false`.
   */
  function baseUnset(object, path) {
    path = isKey(path, object) ? [path] : castPath(path);
    object = parent(object, path);

    var key = toKey(last(path));
    return !(object != null && hasOwnProperty.call(object, key)) || delete object[key];
  }

  return baseUnset;
});
