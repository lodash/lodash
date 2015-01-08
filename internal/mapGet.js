define([], function() {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /**
   * Gets the cached value for `key`.
   *
   * @private
   * @name get
   * @memberOf _.memoize.Cache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the cached value.
   */
  function mapGet(key) {
    return key == '__proto__' ? undefined : this.__data__[key];
  }

  return mapGet;
});
