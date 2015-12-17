define(['./isArrayLike', '../lang/isObject', '../object/values'], function(isArrayLike, isObject, values) {

  /**
   * Converts `value` to an array-like object if it's not one.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {Array|Object} Returns the array-like object.
   */
  function toIterable(value) {
    if (value == null) {
      return [];
    }
    if (!isArrayLike(value)) {
      return values(value);
    }
    return isObject(value) ? value : Object(value);
  }

  return toIterable;
});
