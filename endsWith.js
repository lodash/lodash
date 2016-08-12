define(['./_baseClamp', './_baseToString', './toInteger', './toString'], function(baseClamp, baseToString, toInteger, toString) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /**
   * Checks if `string` ends with the given target string.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category String
   * @param {string} [string=''] The string to inspect.
   * @param {string} [target] The string to search for.
   * @param {number} [position=string.length] The position to search up to.
   * @returns {boolean} Returns `true` if `string` ends with `target`,
   *  else `false`.
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
    string = toString(string);
    target = baseToString(target);

    var length = string.length;
    position = position === undefined
      ? length
      : baseClamp(toInteger(position), 0, length);

    var end = position;
    position -= target.length;
    return position >= 0 && string.slice(position, end) == target;
  }

  return endsWith;
});
