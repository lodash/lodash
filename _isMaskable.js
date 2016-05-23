define(['./_coreJsData', './isFunction', './stubFalse'], function(coreJsData, isFunction, stubFalse) {

  /**
   * Checks if `func` is capable of being masked.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `func` is maskable, else `false`.
   */
  var isMaskable = coreJsData ? isFunction : stubFalse;

  return isMaskable;
});
