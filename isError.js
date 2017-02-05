import baseGetTag from './.internal/baseGetTag.js'
import isObjectLike from './isObjectLike.js'
import isPlainObject from './isPlainObject.js'

/**
 * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
 * `SyntaxError`, `TypeError`, or `URIError` object.
 *
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
 * @example
 *
 * isError(new Error)
 * // => true
 *
 * isError(Error)
 * // => false
 */
function isError(value) {
  if (!isObjectLike(value)) {
    return false
  }
  const tag = baseGetTag(value)
  return tag == '[object Error]' || tag == '[object DOMException]' ||
    (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value))
}

export default isError
