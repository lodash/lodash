import castArray from './castArray.js'

/**
 * Composes a function that returns the result of invoking the given functions
 * with the `this` binding of the created function, where each successive
 * invocation is supplied the return value of the previous.
 *
 * @since 3.0.0
 * @category Util
 * @param {Function[]} [funcs] The functions to invoke.
 * @returns {Function} Returns the new composite function.
 * @see flowRight
 * @example
 *
 * function square(n) {
 *   return n * n
 * }
 *
 * const addSquare = flow([add, square])
 * addSquare(1, 2)
 * // => 9
 */
function flow(funcs) {
  if (funcs && funcs.includes((func) => typeof func !== 'function')) {
    throw new TypeError('Expected a function')
  }
  return function(...args) {
    return funcs ? funcs.reduce((prev, func) => func(...castArray(prev)), args) : args[0]
  }
}

export default flow
