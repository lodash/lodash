/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  const result = [];
  if (object != null) {
    for (const key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

export default nativeKeysIn;
