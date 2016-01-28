define(['./_Stack', './_arrayEach', './_assignMergeValue', './_baseMergeDeep', './isArray', './isObject', './isTypedArray', './keysIn'], function(Stack, arrayEach, assignMergeValue, baseMergeDeep, isArray, isObject, isTypedArray, keysIn) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /**
   * The base implementation of `_.merge` without support for multiple sources.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} [customizer] The function to customize merged values.
   * @param {Object} [stack] Tracks traversed source values and their merged counterparts.
   */
  function baseMerge(object, source, srcIndex, customizer, stack) {
    if (object === source) {
      return;
    }
    var props = (isArray(source) || isTypedArray(source)) ? undefined : keysIn(source);
    arrayEach(props || source, function(srcValue, key) {
      if (props) {
        key = srcValue;
        srcValue = source[key];
      }
      if (isObject(srcValue)) {
        stack || (stack = new Stack);
        baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
      }
      else {
        var newValue = customizer ? customizer(object[key], srcValue, (key + ''), object, source, stack) : undefined;
        if (newValue === undefined) {
          newValue = srcValue;
        }
        assignMergeValue(object, key, newValue);
      }
    });
  }

  return baseMerge;
});
