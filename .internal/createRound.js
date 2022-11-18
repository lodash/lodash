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
    let isNegative = number < 0, isRound = methodName == 'round';
    precision = precision == null ? 0 : (precision >= 0 ? Math.min(precision, 292) : Math.max(precision, -292))
    // Shift with exponential notation to avoid floating-point issues.
    // See [MDN](https://mdn.io/round#Examples) for more details.
    if (precision) {
      if (isRound && isNegative) {
        let t = -number;
        let pair = `${t}e`.split('e')
        const value = func(`${pair[0]}e${+pair[1] + precision}`)

        pair = `${value}e`.split('e')
        return -`${pair[0]}e${+pair[1] - precision}`
      } else {
        let pair = `${number}e`.split('e')
        const value = func(`${pair[0]}e${+pair[1] + precision}`)

        pair = `${value}e`.split('e')
        return +`${pair[0]}e${+pair[1] - precision}`
      }
    }
    else {
      if (isRound && isNegative) return -func(-number)
      else return func(number)
    }
  }
}

export default createRound
