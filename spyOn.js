/**
 * Defers invoking the `func` until the current call stack has cleared. Any
 * additional arguments are provided to `func` when it's invoked.
 *
 * @category Function
 * @param {Function} callback The function to spy.
 * @param {Function} spy Function that is performed before `callback`.
 * If function return something other `undefined` spied function will not execute
 * @returns {...*} Returns result of `callback`. Or this what return `spy`
 * @example
 *
 * function spied(foo) {
 *  console.log(foo)
 *  return 10
 * }
 *
 * const spy = spyOn(spied, foo => {
 *  console.log('Inside Spy :) ')
 * })
 *
 * let result = spy('Hello World')
 * // => Logs 'Inside Spy :) Hello World'.
 * // => result === 10
 */
function spyOn(callback, spy) {
  if (typeof callback != 'function' || typeof spy != 'function') {
    throw new TypeError('Expected a function')
  }

  return (...args) => {
    const result = spy(callback, ...args)
    return (result === undefined)? callback(...args) : result
  }
}

export default spyOn
