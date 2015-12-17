define(['../internal/baseIsMatch', '../internal/bindCallback', '../internal/getMatchData'], function(baseIsMatch, bindCallback, getMatchData) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /**
   * Performs a deep comparison between `object` and `source` to determine if
   * `object` contains equivalent property values. If `customizer` is provided
   * it's invoked to compare values. If `customizer` returns `undefined`
   * comparisons are handled by the method instead. The `customizer` is bound
   * to `thisArg` and invoked with three arguments: (value, other, index|key).
   *
   * **Note:** This method supports comparing properties of arrays, booleans,
   * `Date` objects, numbers, `Object` objects, regexes, and strings. Functions
   * and DOM nodes are **not** supported. Provide a customizer function to extend
   * support for comparing other values.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {Object} object The object to inspect.
   * @param {Object} source The object of property values to match.
   * @param {Function} [customizer] The function to customize value comparisons.
   * @param {*} [thisArg] The `this` binding of `customizer`.
   * @returns {boolean} Returns `true` if `object` is a match, else `false`.
   * @example
   *
   * var object = { 'user': 'fred', 'age': 40 };
   *
   * _.isMatch(object, { 'age': 40 });
   * // => true
   *
   * _.isMatch(object, { 'age': 36 });
   * // => false
   *
   * // using a customizer callback
   * var object = { 'greeting': 'hello' };
   * var source = { 'greeting': 'hi' };
   *
   * _.isMatch(object, source, function(value, other) {
   *   return _.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/) || undefined;
   * });
   * // => true
   */
  function isMatch(object, source, customizer, thisArg) {
    customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
    return baseIsMatch(object, getMatchData(source), customizer);
  }

  return isMatch;
});
