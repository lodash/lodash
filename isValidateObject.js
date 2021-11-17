import every from './every';
import isArrayLikeObject from './isArrayLikeObject.js';
import isEmpty from './isEmpty';
import isNumber from './isNumber';
import isObjectLike from './isObjectLike.js';
import keys from './keys';

/**
 * Checks if `object` is `whole non empty value`.
 *
 * @category Lang
 * @param {Object} object The value to check.
 * @returns {boolean} Returns `true` if `whole non empty value` is a `object`, else `false`.
 * @example
 * 
 * isValidateObject([-1, -2, -3]) 
 * // => true
 *
 * isValidateObject([0, 1, 2]) 
 * // => true
 *
 * isValidateObject([1, 2, 3]) 
 * // => true
 *
 * isValidateObject({a: 'foo', b: 'bar'}) 
 * // => true
 *
 * isValidateObject([1, undefined, 3])
 * // => false
 *
 * isValidateObject({a: 'foo', bar: undefined})
 * // => false
 *
 * isValidateObject({a: undefined, bar: undefined})
 * // => false
 *
 * isValidateObject(null)
 * // => false
 *
 * isValidateObject('')
 * // => false
 *
 * isValidateObject(undefined)
 * // => false
 */

function isValidateObject(object) {
  function validate(element) {
    return isNumber(element) ? true : !isEmpty(element)
  }
  
  if (isArrayLikeObject(object)) {
    return every(object, (element) => validate(element))
  }
  
  if (isObjectLike(object)) {
    const _keys = keys(object);
    if (_keys.length < 1) return false
    return every(_keys, (key) => validate(object[key]))
  }
  
  return false
}

export default isValidateObject
