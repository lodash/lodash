define(['./isArray', './_stringToPath'], function(isArray, stringToPath) {

  /**
   * The base implementation of `_.toPath` which only converts `value` to a
   * path if it's not one.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {Array} Returns the property path array.
   */
  function baseToPath(value) {
    return isArray(value) ? value : stringToPath(value);
  }

  return baseToPath;
});
