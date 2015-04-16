import getLength from './getLength';
import isLength from './isLength';
import isObject from '../lang/isObject';
import values from '../object/values';

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
  if (!isLength(getLength(value))) {
    return values(value);
  }
  return isObject(value) ? value : Object(value);
}

export default toIterable;
