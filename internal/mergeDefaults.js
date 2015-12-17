define(['../object/merge'], function(merge) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /**
   * Used by `_.defaultsDeep` to customize its `_.merge` use.
   *
   * @private
   * @param {*} objectValue The destination object property value.
   * @param {*} sourceValue The source object property value.
   * @returns {*} Returns the value to assign to the destination object.
   */
  function mergeDefaults(objectValue, sourceValue) {
    return objectValue === undefined ? sourceValue : merge(objectValue, sourceValue, mergeDefaults);
  }

  return mergeDefaults;
});
