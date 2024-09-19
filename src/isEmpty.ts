import getTag from './.internal/getTag.js';
import isArrayLike from './isArrayLike.js';
import isTypedArray from './isTypedArray.js';

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * isEmpty(null)
 * // => true
 *
 * isEmpty(true)
 * // => true
 *
 * isEmpty(1)
 * // => true
 *
 * isEmpty([1, 2, 3])
 * // => false
 *
 * isEmpty('abc')
 * // => false
 *
 * isEmpty({ 'a': 1 })
 * // => false
 */
 function isEmpty(value: any): boolean {
    if (value == null || value.length === 0) {
      return true;
    }
  
    // Optimized type checks for performance and edge cases
    const type = typeof value;
    if (type === 'object' || type === 'function') {
      // Handle objects, arrays, strings, Maps, Sets, and TypedArrays efficiently
      const isLengthProperty = Object.prototype.hasOwnProperty.call(value, 'length');
      if (isLengthProperty && (isArrayLike(value))) {
        return !value.length;
      } else if ((type === 'object' && (getTag(value) === '[object Map]' || getTag(value) === '[object Set]')) ||
                 isTypedArray(value)) {
        return !value.size;
      } else {
        // Efficiently iterate over enumerable own properties
        for (const key in value) {
          if (hasOwnProperty.call(value, key)) {
            return false;
          }
        }
      }
    }
  
    return false;
  }

export default isEmpty;
