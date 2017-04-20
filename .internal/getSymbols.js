import filter from '../filter.js'

/** Built-in value references. */
const propertyIsEnumerable = Object.prototype.propertyIsEnumerable

/* Built-in method references for those with the same name as other `lodash` methods. */
const nativeGetSymbols = Object.getOwnPropertySymbols

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
const getSymbols = !nativeGetSymbols ? () => [] : (object) => {
  if (object == null) {
    return []
  }
  object = Object(object)
  return filter(nativeGetSymbols(object), (symbol) => propertyIsEnumerable.call(object, symbol))
}

export default getSymbols
