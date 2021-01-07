import nth from './nth.js'

/**
 * Creates a function that gets the argument at index `n`. If `n` is negative,
 * the nth argument from the end is returned.
 *
 * @since 4.0.0
 * @category Util
 * @example
 *   const func = nthArg(1)
 *   func('a', 'b', 'c', 'd')
 *   // => 'b'
 *
 *   const func = nthArg(-2)
 *   func('a', 'b', 'c', 'd')
 *   // => 'c'
 *
 * @param {number} [n] The index of the argument to return. Default is `0`
 * @returns {Function} Returns the new pass-thru function.
 */
function nthArg(n) {
  return (...args) => nth(args, n)
}

export default nthArg
