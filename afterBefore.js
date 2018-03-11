/**
 * A combination of `after` and `before`. This method creates a function that invokes
 * `func` once it's called `start` or more times until it's called `end` times.
 *
 * @since 5.0.0
 * @category Function
 * @param {number} start The number of calls before `func` is invoked.
 * @param {number} end The number of calls at which `func` is no longer invoked.
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * var fn = afterBefore(2, 4, (num) => {
 *    console.log(num)
 * })
 * 
 * fn(23) 
 * fn(12) // Prints "12"
 * fn(24) // Prints "24"
 * fn(11) 
 * fn(14) 
 */
function afterBefore(start, end, func) {
  if (typeof func != 'function') {
    throw new TypeError('Expected a function')
  }
  if (start >= end) {
    throw new RangeError('Expected start to be less than end')
  }
  let counter = 0
  return function(...args) {
    if(++counter >= start) {
      if(counter < end) {
        return func.apply(this, args)
      }
    } 
  }
}

export default afterBefore
