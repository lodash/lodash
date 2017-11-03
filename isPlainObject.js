import baseGetTag from './.internal/baseGetTag.js'
import isObjectLike from './isObjectLike.js'

/** Used to resolve the decompiled source of functions. */
const funcToString = Function.prototype.toString

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty

/** Used to infer the `Object` constructor. */
const objectCtorString = funcToString.call(Object)

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1
 * }
 *
 * isPlainObject(new Foo)
 * // => false
 *
 * isPlainObject([1, 2, 3])
 * // => false
 *
 * isPlainObject({ 'x': 0, 'y': 0 })
 * // => true
 *
 * isPlainObject(Object.create(null))
 * // => true
 */
function isPlainObject(value) {
  return (
    value !== null &&
    value !== undefined && (
      Object.getPrototypeOf(value) === null ||
      Object.getPrototypeOf(value).constructor === Object
    )
  )
}

export default isPlainObject
