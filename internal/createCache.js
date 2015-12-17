define(['./SetCache', './getNative', './root'], function(SetCache, getNative, root) {

  /** Native method references. */
  var Set = getNative(root, 'Set');

  /* Native method references for those with the same name as other `lodash` methods. */
  var nativeCreate = getNative(Object, 'create');

  /**
   * Creates a `Set` cache object to optimize linear searches of large arrays.
   *
   * @private
   * @param {Array} [values] The values to cache.
   * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
   */
  function createCache(values) {
    return (nativeCreate && Set) ? new SetCache(values) : null;
  }

  return createCache;
});
