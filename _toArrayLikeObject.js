import isArrayLikeObject from './isArrayLikeObject';

/**
 * Converts `value` to an array-like object if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Array} Returns the array-like object.
 */
function toArrayLikeObject(value) {
  return isArrayLikeObject(value) ? value : [];
}

export default toArrayLikeObject;
