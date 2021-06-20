import baseIsEqual from './.internal/baseIsEqual.js'
import isEmpty from './isEmpty';
import intersectionWith from './intersectionWith';
import isObjectLike from './isObjectLike.js';

/**
 * This method is like `isEqual` except that it only compares the common properties
 * between both objects. The method first checks equality with `isEqual`, and if it
 * returns `false`, it then compares both objects only by the shared properties. If
 * each one of these are equal, it will return `true`, else `false`.
 *
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * const objectA = {
 *  c: '3',
 *  a: '1',
 *  b: '2',
 * }
 * 
 * const objectB = {
 *  b: '2',
 *  c: '3',
 *  d: '5',
 * }
 * 
 * const objectC = {
 *  a: '4',
 *  b: '2',
 * }
 * 
 * isEqualCommonProps(objectA, objectB)
 * // => true
 * 
 * isEqualCommonProps(objectA, objectC)
 * // => false
 */
function isEqualCommonProps(value, other) {
  if (baseIsEqual(value, other)) {
    return true;
  }

  if (!isObjectLike(value) || !isObjectLike(other)) {
    return false;
  }

  const valueProps = Object.keys(value);
  const otherProps = Object.keys(other);
  const commonProps = intersectionWith(valueProps, otherProps, baseIsEqual);

  if (isEmpty(commonProps)) {
    return false;
  }

  const modifiedValue = {};
  const modifiedOther = {};

  commonProps.forEach((prop) => {
    modifiedValue[prop] = value[prop];
    modifiedOther[prop] = other[prop];
  });

  return baseIsEqual(modifiedValue, modifiedOther);
}

export default isEqualCommonProps;
