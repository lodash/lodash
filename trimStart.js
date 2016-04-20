define(['./_baseToString', './_castSlice', './_charsStartIndex', './_stringToArray', './toString'], function(baseToString, castSlice, charsStartIndex, stringToArray, toString) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /** Used to match leading and trailing whitespace. */
  var reTrimStart = /^\s+/;

  /**
   * Removes leading whitespace or specified characters from `string`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category String
   * @param {string} [string=''] The string to trim.
   * @param {string} [chars=whitespace] The characters to trim.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {string} Returns the trimmed string.
   * @example
   *
   * _.trimStart('  abc  ');
   * // => 'abc  '
   *
   * _.trimStart('-_-abc-_-', '_-');
   * // => 'abc-_-'
   */
  function trimStart(string, chars, guard) {
    string = toString(string);
    if (string && (guard || chars === undefined)) {
      return string.replace(reTrimStart, '');
    }
    if (!string || !(chars = baseToString(chars))) {
      return string;
    }
    var strSymbols = stringToArray(string),
        start = charsStartIndex(strSymbols, stringToArray(chars));

    return castSlice(strSymbols, start).join('');
  }

  return trimStart;
});
