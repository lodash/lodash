import baseSum from './.internal/baseSum.js'

/**
 * This method is like `sum` except that it accepts `iteratee` which is invoked
 * for each element in `array` to generate the value to be summed. The iteratee
 * is invoked with one argument: (value).
 *
 * @since 4.0.0
 * @category Math
 * @example
 *   const objects = [{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }]
 *
 *   sumBy(objects, ({ n }) => n)
 *   // => 20
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {number} Returns the sum.
 */
function sumBy(array, iteratee) {
  return array != null && array.length ? baseSum(array, iteratee) : 0
}

export default sumBy
