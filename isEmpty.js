import baseKeys from './_baseKeys.js';
import getTag from './_getTag.js';
import isArguments from './isArguments.js';
import isArrayLike from './isArrayLike.js';
import isBuffer from './isBuffer.js';
import isPrototype from './_isPrototype.js';
import isTypedArray from './isTypedArray.js';

/** `Object#toString` result references. */
const mapTag = '[object Map]';
const setTag = '[object Set]';

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
 * @static
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * isEmpty(null);
 * // => true
 *
 * isEmpty(true);
 * // => true
 *
 * isEmpty(1);
 * // => true
 *
 * isEmpty([1, 2, 3]);
 * // => false
 *
 * isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value) &&
      (Array.isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
        isBuffer(value) || isTypedArray(value) || isArguments(value))) {
    return !value.length;
  }
  const tag = getTag(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !baseKeys(value).length;
  }
  for (const key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

export default isEmpty;
