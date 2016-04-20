define(['./_baseRepeat', './_baseToString', './_castSlice', './_reHasComplexSymbol', './_stringSize', './_stringToArray'], function(baseRepeat, baseToString, castSlice, reHasComplexSymbol, stringSize, stringToArray) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeCeil = Math.ceil;

  /**
   * Creates the padding for `string` based on `length`. The `chars` string
   * is truncated if the number of characters exceeds `length`.
   *
   * @private
   * @param {number} length The padding length.
   * @param {string} [chars=' '] The string used as padding.
   * @returns {string} Returns the padding for `string`.
   */
  function createPadding(length, chars) {
    chars = chars === undefined ? ' ' : baseToString(chars);

    var charsLength = chars.length;
    if (charsLength < 2) {
      return charsLength ? baseRepeat(chars, length) : chars;
    }
    var result = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
    return reHasComplexSymbol.test(chars)
      ? castSlice(stringToArray(result), 0, length).join('')
      : result.slice(0, length);
  }

  return createPadding;
});
