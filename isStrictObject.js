/**
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is strictly object, else `false`.
 * @example
 *
 * isStrictObject({})
 * // => true
 *
 * isStrictObject([1, 2, 3])
 * // => false
 *
 * isStrictObject(Function)
 * // => false
 *
 * isStrictObject(null)
 * // => false
 */
function isStrictObject(value) {
  const type = typeof value
  return value !== null && type === 'object' && Object.prototype
    .toString
    .call(value)
    .replace(/\[|object\s|\]/g, '')
    .toLowerCase() === 'object'
}

export default isStrictObject
