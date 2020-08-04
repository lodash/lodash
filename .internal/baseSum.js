/**
 * The base implementation of `sum` and `sumBy`.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {number} Returns the sum.
 */
function baseSum(array, iteratee) {
  let result = 0

  for (const value of array) {
    const current = iteratee(value)
    if(current != null){
      result += +current
    }
  }
  return result
}

export default baseSum
