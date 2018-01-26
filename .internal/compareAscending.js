import isSymbol from '../isSymbol.js'

/**
 * Compares values to sort them in ascending order.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */
function compareAscending(value, other) {
  if (value !== other) {
    const valIsDefined = value !== undefined
    const valIsNull = value === null
    const valIsReflexive = value === value
    const valIsSymbol = isSymbol(value)

    const othIsDefined = other !== undefined
    const othIsNull = other === null
    const othIsReflexive = other === other
    const othIsSymbol = isSymbol(other)

    const val = typeof value == 'string'
      ? value.localeCompare(other)
      : -other

    if ((!othIsNull && !othIsSymbol && !valIsSymbol && val > 0) ||
        (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
        (valIsNull && othIsDefined && othIsReflexive) ||
        (!valIsDefined && othIsReflexive) ||
        !valIsReflexive) {
      return 1
    }
    if ((!valIsNull && !valIsSymbol && !othIsSymbol && val < 0) ||
        (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
        (othIsNull && valIsDefined && valIsReflexive) ||
        (!othIsDefined && valIsReflexive) ||
        !othIsReflexive) {
      return -1
    }
  }
  return 0
}

export default compareAscending
