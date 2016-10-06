define(['./_assignMergeValue', './_cloneBuffer', './_cloneTypedArray', './_copyArray', './_initCloneObject', './isArguments', './isArray', './isArrayLikeObject', './isBuffer', './isFunction', './isObject', './isPlainObject', './isTypedArray', './toPlainObject'], function(assignMergeValue, cloneBuffer, cloneTypedArray, copyArray, initCloneObject, isArguments, isArray, isArrayLikeObject, isBuffer, isFunction, isObject, isPlainObject, isTypedArray, toPlainObject) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /**
   * A specialized version of `baseMerge` for arrays and objects which performs
   * deep merges and tracks traversed objects enabling objects with circular
   * references to be merged.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {string} key The key of the value to merge.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} mergeFunc The function to merge values.
   * @param {Function} [customizer] The function to customize assigned values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */
  function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = object[key],
        srcValue = source[key],
        stacked = stack.get(srcValue);

    if (stacked) {
      assignMergeValue(object, key, stacked);
      return;
    }
    var newValue = customizer
      ? customizer(objValue, srcValue, (key + ''), object, source, stack)
      : undefined;

    var isCommon = newValue === undefined;

    if (isCommon) {
      var isArr = isArray(srcValue),
          isBuff = !isArr && isBuffer(srcValue),
          isTyped = !isArr && !isBuff && isTypedArray(srcValue);

      newValue = srcValue;
      if (isArr || isBuff || isTyped) {
        if (isArray(objValue)) {
          newValue = objValue;
        }
        else if (isArrayLikeObject(objValue)) {
          newValue = copyArray(objValue);
        }
        else if (isBuff) {
          isCommon = false;
          newValue = cloneBuffer(srcValue, true);
        }
        else if (isTyped) {
          isCommon = false;
          newValue = cloneTypedArray(srcValue, true);
        }
        else {
          newValue = [];
        }
      }
      else if (isPlainObject(srcValue) || isArguments(srcValue)) {
        newValue = objValue;
        if (isArguments(objValue)) {
          newValue = toPlainObject(objValue);
        }
        else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
          newValue = initCloneObject(srcValue);
        }
      }
      else {
        isCommon = false;
      }
    }
    if (isCommon) {
      // Recursively merge objects and arrays (susceptible to call stack limits).
      stack.set(srcValue, newValue);
      mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
      stack['delete'](srcValue);
    }
    assignMergeValue(object, key, newValue);
  }

  return baseMergeDeep;
});
