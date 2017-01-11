/**
 * This function is a thin wrapper around
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * which ensures non-object values are coerced to objects beforehand.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeys(object) {
  return Object.keys(Object(object));
}

export default nativeKeys;
