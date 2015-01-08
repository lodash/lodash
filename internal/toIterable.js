define(['./isLength', '../lang/isObject', '../object/values'], function(isLength, isObject, values) {

  /**
   * Converts `value` to an array-like object if it is not one.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {Array|Object} Returns the array-like object.
   */
  function toIterable(value) {
    if (value == null) {
      return [];
    }
    if (!isLength(value.length)) {
      return values(value);
    }
    return isObject(value) ? value : Object(value);
  }

  return toIterable;
});
