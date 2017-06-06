/**
 * Calls the passed function once in the passed interval.
 *
 * @since 4.17.4
 * @category Function
 * @param {Function} functionTobeCalled The function to be called in the interval.
 * @param {number} [interval=600] The interval (in milliseconds) within which the function will not be called.
 * @returns {Function} Returns the new function.
 * @example
 *
 * // Call a form submit only once even if the user presses the button multiple times.
 * const onSubmit = () => 'called'
 * const clickHandler = callOnceInInterval(onSubmit, 1000);
 * clickHandler();
 * // => 'called' //This will call the onSubmit
 * clickHandler();
 * // => undefined  //All the further calls will not be processed until 1000 ms.
 *
 */

const callOnceInInterval = (functionTobeCalled, interval = 600) => {
  let isCalled = false,
    timer
  return () => {
    if (!isCalled) {
      isCalled = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        isCalled = false
      }, interval)
      return functionTobeCalled()
    }
    return
  }
}

export default callOnceInInterval
