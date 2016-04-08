define(['./isArguments', './isArray', './isArrayLikeObject'], function(isArguments, isArray, isArrayLikeObject) {

  /**
   * Checks if `value` is a flattenable `arguments` object or array.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
   */
  function isFlattenable(value) {
    return isArrayLikeObject(value) && (isArray(value) || isArguments(value));
  }

  return isFlattenable;
});
