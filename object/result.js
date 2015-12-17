define(['../internal/baseGet', '../internal/baseSlice', '../lang/isFunction', '../internal/isKey', '../array/last', '../internal/toPath'], function(baseGet, baseSlice, isFunction, isKey, last, toPath) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /**
   * This method is like `_.get` except that if the resolved value is a function
   * it's invoked with the `this` binding of its parent object and its result
   * is returned.
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to resolve.
   * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
   * @returns {*} Returns the resolved value.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
   *
   * _.result(object, 'a[0].b.c1');
   * // => 3
   *
   * _.result(object, 'a[0].b.c2');
   * // => 4
   *
   * _.result(object, 'a.b.c', 'default');
   * // => 'default'
   *
   * _.result(object, 'a.b.c', _.constant('default'));
   * // => 'default'
   */
  function result(object, path, defaultValue) {
    var result = object == null ? undefined : object[path];
    if (result === undefined) {
      if (object != null && !isKey(path, object)) {
        path = toPath(path);
        object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
        result = object == null ? undefined : object[last(path)];
      }
      result = result === undefined ? defaultValue : result;
    }
    return isFunction(result) ? result.call(object) : result;
  }

  return result;
});
