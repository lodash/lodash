import assignValue from './assignValue.js'
import castPath from './castPath.js'
import isIndex from './isIndex.js'
import isObject from '../isObject.js'
import toKey from './toKey.js'

/**
 * The base implementation of `set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet<T>(object: T, path: string | string[], value: any, customizer?: (objValue: any, key: string, nested: T) => any): T {
  if (!isObject(object)) {
    return object
  }
  path = castPath(path, object)

  const length = path.length
  const lastIndex = length - 1

  let index = -1
  let nested: any = object

  while (nested != null && ++index < length) {
    const key = toKey(path[index])
    let newValue = value

    if (index !== lastIndex) {
      const objValue = nested[key]
      // Validate key to prevent prototype pollution
      if (!isValidKey(key)) {
        throw new Error('Invalid key detected');
      }
      // Validate objValue to prevent prototype pollution
      if (!isObject(objValue)) {
        throw new Error('Invalid object value detected');
      }

      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject(objValue)
          ? objValue
          : (isIndex(path[index + 1]) ? [] : {})
      }
    }
    assignValue(nested, key, newValue)
    nested = nested[key]
  }
  return object
}

// Function to validate keys to prevent prototype pollution
function isValidKey(key: string): boolean {
  const disallowedKeys = ['__proto__', '__constructor__', '__prototype__'];
  return !disallowedKeys.includes(key);
}

export default baseSet;
