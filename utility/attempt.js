define(['../internal/baseSlice', '../lang/isError'], function(baseSlice, isError) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /**
   * Attempts to invoke `func`, returning either the result or the caught error
   * object. Any additional arguments are provided to `func` when it is invoked.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {*} func The function to attempt.
   * @returns {*} Returns the `func` result or error object.
   * @example
   *
   * // avoid throwing errors for invalid selectors
   * var elements = _.attempt(function(selector) {
   *   return document.querySelectorAll(selector);
   * }, '>_>');
   *
   * if (_.isError(elements)) {
   *   elements = [];
   * }
   */
  function attempt(func) {
    try {
      return func.apply(undefined, baseSlice(arguments, 1));
    } catch(e) {
      return isError(e) ? e : new Error(e);
    }
  }

  return attempt;
});
