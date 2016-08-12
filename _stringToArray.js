define(['./_asciiToArray', './_hasUnicode', './_unicodeToArray'], function(asciiToArray, hasUnicode, unicodeToArray) {

  /**
   * Converts `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function stringToArray(string) {
    return hasUnicode(string)
      ? unicodeToArray(string)
      : asciiToArray(string);
  }

  return stringToArray;
});
