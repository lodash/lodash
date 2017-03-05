import createWrap from './.internal/createWrap.js'

/** Used to compose bitmasks for function metadata. */
const WRAP_CURRY_RIGHT_FLAG = 16

/**
 * This method is like `curry` except that arguments are applied to `func`
 * in the manner of `partialRight` instead of `partial`.
 *
 * The `curryRight.placeholder` value, which defaults to `_` in monolithic
 * builds, may be used as a placeholder for provided arguments.
 *
 * **Note:** This method doesn't set the "length" property of curried functions.
 *
 * @since 3.0.0
 * @category Function
 * @param {Function} func The function to curry.
 * @param {number} [arity=func.length] The arity of `func`.
 * @returns {Function} Returns the new curried function.
 * @example
 *
 * const abc = function(a, b, c) {
 *   return [a, b, c]
 * }
 *
 * const curried = curryRight(abc)
 *
 * curried(3)(2)(1)
 * // => [1, 2, 3]
 *
 * curried(2, 3)(1)
 * // => [1, 2, 3]
 *
 * curried(1, 2, 3)
 * // => [1, 2, 3]
 *
 * // Curried with placeholders.
 * curried(3)(1, _)(2)
 * // => [1, 2, 3]
 */
function curryRight(func, arity) {
  const result = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined, undefined, undefined, undefined, undefined, arity)
  result.placeholder = curryRight.placeholder
  return result
}

// Assign default placeholders.
curryRight.placeholder = {}

export default curryRight
