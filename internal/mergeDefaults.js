define(['./baseClone', './baseMerge', '../isObject'], function(baseClone, baseMerge, isObject) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /**
   * Used by `_.defaultsDeep` to customize its `_.merge` use.
   *
   * @private
   * @param {*} objValue The destination value.
   * @param {*} srcValue The source value.
   * @param {string} key The key of the property to merge.
   * @param {Object} object The parent object of `objValue`.
   * @param {Object} source The parent object of `srcValue`.
   * @param {Object} [stack] Tracks traversed source values and their merged counterparts.
   * @returns {*} Returns the value to assign.
   */
  function mergeDefaults(objValue, srcValue, key, object, source, stack) {
    if (isObject(objValue) && isObject(srcValue)) {
      stack.set(srcValue, objValue);
      baseMerge(objValue, srcValue, mergeDefaults, stack);
    }
    return objValue === undefined ? baseClone(srcValue) : objValue;
  }

  return mergeDefaults;
});
