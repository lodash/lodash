define(['./LazyWrapper', './LodashWrapper', './arrayCopy'], function(LazyWrapper, LodashWrapper, arrayCopy) {

  /**
   * Creates a clone of `wrapper`.
   *
   * @private
   * @param {Object} wrapper The wrapper to clone.
   * @returns {Object} Returns the cloned wrapper.
   */
  function wrapperClone(wrapper) {
    return wrapper instanceof LazyWrapper
      ? wrapper.clone()
      : new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__, arrayCopy(wrapper.__actions__));
  }

  return wrapperClone;
});
