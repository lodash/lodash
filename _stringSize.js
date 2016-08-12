define(['./_asciiSize', './_hasUnicode', './_unicodeSize'], function(asciiSize, hasUnicode, unicodeSize) {

  /**
   * Gets the number of symbols in `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the string size.
   */
  function stringSize(string) {
    return hasUnicode(string)
      ? unicodeSize(string)
      : asciiSize(string);
  }

  return stringSize;
});
