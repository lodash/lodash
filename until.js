/**
 * Calls the `actualFunction` with given `arguments` until the result satisfies the `barrierFunction`.
 *
 * **Note:** This method is based on
 * [`String#replace`](https://mdn.io/String/replace).
 *
 * @since 4.0.0
 * @category String
 * @param {CallableFunction} [actualFunction] The function that we want to call it more than once.
 * @param {Array} [arguments] The arguments array exists for the pass to data to our actual function.
 * @param {CallableFunction} [barrierFunction] the reference function to stop the iteration and return 
 * the last generated value. That function should return boolean values. If it returns true the iteration 
 * will break and ._until the function should return the last value of the actual function.
 * @param {Number} [retry] An optional parameter that defines the maximum retry count of the ._until function.
 * @returns Returns the final result.
 * @example
 * 
 * _.until(_.random, [1, 5], number => number % 2);
 * _.until(_.random, [1, 5], number => number % 2, retry=2);
 *
 */
function until(actualFunction, [...arguments], barrierFunction, retry=undefined) {
  let repeat = 0

  while (true) {
    const result = actualFunction(...arguments)

    if (barrierFunction(result))
      return result

    if (retry === undefined)
      continue

    repeat++

    if (repeat > retry)
      return result
  }
}

export default until