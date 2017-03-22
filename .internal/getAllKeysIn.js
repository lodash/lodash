import getSymbolsIn from './getSymbolsIn.js'
import baseKeysIn from './baseKeysIn.js'

/**
 * Creates an array of own and inherited enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  const result = baseKeysIn(object)
  if (!Array.isArray(object)) {
    result.push(...getSymbolsIn(object))
  }
  return result
}

export default getAllKeysIn
