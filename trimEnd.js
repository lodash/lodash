define(['./_baseToString', './_castSlice', './_charsEndIndex', './_stringToArray', './_trimmedEndIndex', './toString'], function(baseToString, castSlice, charsEndIndex, stringToArray, trimmedEndIndex, toString) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /**
   * Removes trailing whitespace or specified characters from `string`.
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
   * _.trimEnd('  abc  ');
   * // => '  abc'
   *
   * _.trimEnd('-_-abc-_-', '_-');
   * // => '-_-abc'
   */
  function trimEnd(string, chars, guard) {
    string = toString(string);
    if (string && (guard || chars === undefined)) {
      return string.slice(0, trimmedEndIndex(string) + 1);
    }
    if (!string || !(chars = baseToString(chars))) {
      return string;
    }
    var strSymbols = stringToArray(string),
        end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;

    return castSlice(strSymbols, 0, end).join('');
  }

  return trimEnd;
});
