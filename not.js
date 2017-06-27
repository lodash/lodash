/*
 *
 * @param {*} value The value to not.
 * @return {boolean} Return `false` if value is truth
 * @example
 *
 * not(false)
 * // => true
 *
 * not(true)
 * // => false
 *
 * not(0)
 * // => true
 *
 * not(null)
 * // => true
 *
 * not(undefined)
 * // => true
 *
 * not({})
 * // => false
*/


function not(value) {
  return !value
}
export default not
