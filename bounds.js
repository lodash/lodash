/**
 * This method retruns the boundries of an array in a form of an object
 * { upper, lower }
 *
 * @since 4.0.0
 * @category Array
 * @param {Array} array The sorted array to inspect.
 * @returns {Object} Returns an object containing the upper and lower bounds
 *  of `array`.
 * @example
 *
 * const objects = [1,5,4,3,-6,2]
 *
 * boundsBy(objects)
 * // => { upper: 5, lower: -6 }
 */
function bounds(array) {
  let upper,lower

  for (const current of array) {
    if (current !== undefined) {
      upper = upper === undefined ? current : Math.max(upper , current)
      lower = lower === undefined ? current : Math.min(lower , current)
    }
  }
  return {upper,lower}
}
export default bounds
