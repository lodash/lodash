define(['../lang/isError', '../function/restParam'], function(isError, restParam) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /**
   * Attempts to invoke `func`, returning either the result or the caught error
   * object. Any additional arguments are provided to `func` when it's invoked.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {Function} func The function to attempt.
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
  var attempt = restParam(function(func, args) {
    try {
      return func.apply(undefined, args);
    } catch(e) {
      return isError(e) ? e : new Error(e);
    }
  });

  return attempt;
});
