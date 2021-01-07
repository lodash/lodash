/**
 * Creates a function that invokes `func` with its arguments transformed.
 *
 * @since 4.0.0
 * @category Function
 * @example
 *   function doubled(n) {
 *     return n * 2
 *   }
 *
 *   function square(n) {
 *     return n * n
 *   }
 *
 *   const func = overArgs((x, y) => [x, y], [square, doubled])
 *
 *   func(9, 3)
 *   // => [81, 6]
 *
 *   func(10, 5)
 *   // => [100, 10]
 *
 * @param {Function} func The function to wrap.
 * @param {Function[]} [transforms] The argument transforms. Default is `[identity]`
 * @returns {Function} Returns the new function.
 */
function overArgs(func, transforms) {
  const funcsLength = transforms.length
  return function (...args) {
    let index = -1
    const length = Math.min(args.length, funcsLength)
    while (++index < length) {
      args[index] = transforms[index].call(this, args[index])
    }
    return func.apply(this, args)
  }
}

export default overArgs
