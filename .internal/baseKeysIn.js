import isObject from '../isObject.js'
import isPrototype from './isPrototype.js'

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * The base implementation of `keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  const result = []
  if (object == null) {
    return result
  }
  if (!isObject(object)) {
    for (const key in Object(object)) {
      result.push(key)
    }
    return result
  }
  const isProto = isPrototype(object)
  for (const key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key)
    }
  }
  return result
}

export default baseKeysIn
