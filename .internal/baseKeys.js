import isPrototype from './isPrototype.js'

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * The base implementation of `keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  object = Object(object)
  if (!isPrototype(object)) {
    return Object.keys(object)
  }
  const result = []
  for (const key in object) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key)
    }
  }
  return result
}

export default baseKeys
