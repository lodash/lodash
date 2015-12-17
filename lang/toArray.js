define(['../internal/arrayCopy', '../internal/getLength', '../internal/isLength', '../object/values'], function(arrayCopy, getLength, isLength, values) {

  /**
   * Converts `value` to an array.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {Array} Returns the converted array.
   * @example
   *
   * (function() {
   *   return _.toArray(arguments).slice(1);
   * }(1, 2, 3));
   * // => [2, 3]
   */
  function toArray(value) {
    var length = value ? getLength(value) : 0;
    if (!isLength(length)) {
      return values(value);
    }
    if (!length) {
      return [];
    }
    return arrayCopy(value);
  }

  return toArray;
});
