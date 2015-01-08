define(['./cachePush', '../lang/isNative', './root'], function(cachePush, isNative, root) {

  /** Native method references. */
  var Set = isNative(Set = root.Set) && Set;

  /* Native method references for those with the same name as other `lodash` methods. */
  var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate;

  /**
   *
   * Creates a cache object to store unique values.
   *
   * @private
   * @param {Array} [values] The values to cache.
   */
  function SetCache(values) {
    var length = values ? values.length : 0;

    this.data = { 'hash': nativeCreate(null), 'set': new Set };
    while (length--) {
      this.push(values[length]);
    }
  }

  // Add functions to the `Set` cache.
  SetCache.prototype.push = cachePush;

  return SetCache;
});
