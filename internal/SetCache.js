define(['./cachePush', './getNative', './root'], function(cachePush, getNative, root) {

  /** Native method references. */
  var Set = getNative(root, 'Set');

  /* Native method references for those with the same name as other `lodash` methods. */
  var nativeCreate = getNative(Object, 'create');

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
