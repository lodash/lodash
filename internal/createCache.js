define(['./SetCache', '../utility/constant', '../lang/isNative', './root'], function(SetCache, constant, isNative, root) {

  /** Native method references. */
  var Set = isNative(Set = root.Set) && Set;

  /* Native method references for those with the same name as other `lodash` methods. */
  var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate;

  /**
   * Creates a `Set` cache object to optimize linear searches of large arrays.
   *
   * @private
   * @param {Array} [values] The values to cache.
   * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
   */
  var createCache = !(nativeCreate && Set) ? constant(null) : function(values) {
    return new SetCache(values);
  };

  return createCache;
});
