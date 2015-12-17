define(['../internal/baseToString'], function(baseToString) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /* Native method references for those with the same name as other `lodash` methods. */
  var nativeMin = Math.min;

  /**
   * Checks if `string` ends with the given target string.
   *
   * @static
   * @memberOf _
   * @category String
   * @param {string} [string=''] The string to search.
   * @param {string} [target] The string to search for.
   * @param {number} [position=string.length] The position to search from.
   * @returns {boolean} Returns `true` if `string` ends with `target`, else `false`.
   * @example
   *
   * _.endsWith('abc', 'c');
   * // => true
   *
   * _.endsWith('abc', 'b');
   * // => false
   *
   * _.endsWith('abc', 'b', 2);
   * // => true
   */
  function endsWith(string, target, position) {
    string = baseToString(string);
    target = (target + '');

    var length = string.length;
    position = position === undefined
      ? length
      : nativeMin(position < 0 ? 0 : (+position || 0), length);

    position -= target.length;
    return position >= 0 && string.indexOf(target, position) == position;
  }

  return endsWith;
});
