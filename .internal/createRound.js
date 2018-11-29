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
	    const modifier = Math.pow(10, precision)
	    return func(number * modifier) / modifier
    }
    return func(number)
  }
}

export default createRound
