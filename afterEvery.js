/**
 * This method creates a function that invokes `func` after
 * every `n` times the function is called.
 *
 * @since 5.0.0
 * @category Function
 * @param {number} n The number of calls after which `func` is invoked each time.
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * const notifications = ['request', 'complete', 'pull', 'request']
 * const group = afterEvery(2, () => console.log('You have 2 new notifications'))
 *
 * forEach(notifications, message => asyncFetch({ 'message': message, 'fetch': group }))
 * // => Logs 'You have 2 new notifications' twice after the four async fetches have 
 * completed.
 */
function afterEvery(n, func) {
  if (typeof func != 'function') {
    throw new TypeError('Expected a function')
  }
  if(n > 1)
  {
    let counter = 1
    return function(...args) {
      if (counter++ % n == 0) {
        return func.apply(this, args)
      }
    }
  }
  else {
    return function(...args) {
        return func.apply(this, args)
    }
  }
}

export default after
