/**
 * Creates a function like `round`.
 *
 * @private
 * @param {string} methodName The name of the `Math` method to use when rounding.
 * @returns {Function} Returns the new round function.
 */
function createRound(methodName) {
  const func = Math[methodName]
  return (number, precision) => {
    precision = precision == null ? 0 : (precision >= 0 ? Math.min(precision, 292) : Math.max(precision, -292))
    if (precision) {
      precision = Number.isInteger(precision) ? precision : Math.floor(precision)
      let modifier = 1
      if (precision > 0) {
        for (let i = 0; i < precision; i++) {
          number *= 10
          modifier *= 10
        }
      } else {
        modifier = Math.pow(10, precision)
        number *= modifier
      }

      return func(number) / modifier
    }
    return func(number)
  }
}

export default createRound
