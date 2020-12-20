/**
 * This method is like `bounds` except that it accepts `iteratee`
 * which is invoked for `value` and each element of `array` to compute their
 * sort ranking. The iteratee is invoked with one argument: (value).
 *
 * @since 4.0.0
 * @category Array
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {Object} Returns an object containing the upper and lower bounds
 *  of `array`.
 * @example
 *
 * const objects = [1,5,4,3,6,2]
 *
 * boundsBy(objects, (i) => -i)
 * // => { upper: -1, lower: -6 }
 */
function boundsBy(array, iteratee) {
  let upper,lower

  for (const value of array) {
    const current = iteratee(value)
    if (current !== undefined) {
      upper = upper === undefined ? value : Math.max(upper , value)
      lower = lower === undefined ? value : Math.min(lower , value)
    }
  }
  return {upper,lower}
}
export default boundsBy
