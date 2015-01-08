define(['./baseSetData', '../lang/isNative', '../support'], function(baseSetData, isNative, support) {

  /** Used to detect named functions. */
  var reFuncName = /^\s*function[ \n\r\t]+\w/;

  /** Used to detect functions containing a `this` reference. */
  var reThis = /\bthis\b/;

  /** Used to resolve the decompiled source of functions. */
  var fnToString = Function.prototype.toString;

  /**
   * Checks if `func` is eligible for `this` binding.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is eligible, else `false`.
   */
  function isBindable(func) {
    var result = !(support.funcNames ? func.name : support.funcDecomp);

    if (!result) {
      var source = fnToString.call(func);
      if (!support.funcNames) {
        result = !reFuncName.test(source);
      }
      if (!result) {
        // Check if `func` references the `this` keyword and store the result.
        result = reThis.test(source) || isNative(func);
        baseSetData(func, result);
      }
    }
    return result;
  }

  return isBindable;
});
