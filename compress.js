import forEach from './forEach.js'
import isNull from './isNull.js'
import isUndefined from './isUndefined.js'
import isEmpty from './isEmpty.js'
import isString from './isString.js'
import isArray from './isArray.js'
import isPlainObject from './isPlainObject.js'

/*
 * Recursively removes `undefined`, `null`, and empty values from `object`
 * @since 4.17.11
 * @category Object
 * @param {Object} object The object to clean.
 * @returns {Object} Returns cleaned object.
 * @example
 *
 * compress({ 'a': '', 'b': { 'c': {}, 'd': 5 }, 'c': { 'd': [] } })
 * // => { 'b': { 'd': 5 } }
 */

function compress(object) {
  var compressed = {};
  forEach(obj, (value, key) => {
    if (!isNull(value) && !isUndefined(value)) {
      if (isPlainObject(value)) {
        var compressedValue = compress(value);
        if (!isEmpty(compressedValue)) {
          compressed[key] = compressedValue;
        }
      } else if (isString(value) || isArray(value)) {
        if (!isEmpty(value)) {
          compressed[key] = value;
        }
      } else {
        compressed[key] = value;
      }
    }
  });
  return compressed;
}

export default compress
