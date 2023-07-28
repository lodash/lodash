import baseToNumber from '.internal/baseToNumber.js'

/**
 * The base implementation of `sum` and `sumBy`.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {number} Returns the sum.
 */
function baseSum(array, iteratee) {
  let result

  for (const value of array) {
    let current = iteratee(value)
    if (current !== undefined) {
      if (typeof current === 'string') {
        current = baseToNumber(current)
      }
      result = result === undefined ? current : (result + current)
    }
  }
  return result
}

export default baseSum
