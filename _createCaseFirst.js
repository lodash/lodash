define(['./_castSlice', './_reHasComplexSymbol', './_stringToArray', './toString'], function(castSlice, reHasComplexSymbol, stringToArray, toString) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /**
   * Creates a function like `_.lowerFirst`.
   *
   * @private
   * @param {string} methodName The name of the `String` case method to use.
   * @returns {Function} Returns the new case function.
   */
  function createCaseFirst(methodName) {
    return function(string) {
      string = toString(string);

      var strSymbols = reHasComplexSymbol.test(string)
        ? stringToArray(string)
        : undefined;

      var chr = strSymbols
        ? strSymbols[0]
        : string.charAt(0);

      var trailing = strSymbols
        ? castSlice(strSymbols, 1).join('')
        : string.slice(1);

      return chr[methodName]() + trailing;
    };
  }

  return createCaseFirst;
});
