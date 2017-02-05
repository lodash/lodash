import Stack from './Stack.js'
import baseIsEqual from './baseIsEqual.js'

/** Used to compose bitmasks for value comparisons. */
const COMPARE_PARTIAL_FLAG = 1
const COMPARE_UNORDERED_FLAG = 2

/**
 * The base implementation of `isMatch`.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  let index = matchData.length
  const length = index
  const noCustomizer = !customizer

  if (object == null) {
    return !length
  }
  let data
  let result
  object = Object(object)
  while (index--) {
    data = matchData[index]
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false
    }
  }
  while (++index < length) {
    data = matchData[index]
    const key = data[0]
    const objValue = object[key]
    const srcValue = data[1]

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false
      }
    } else {
      const stack = new Stack
      if (customizer) {
        result = customizer(objValue, srcValue, key, object, source, stack)
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
            : result
          )) {
        return false
      }
    }
  }
  return true
}

export default baseIsMatch
