/**
 * Attempts to invoke `func`, returning either the result or the default value.
 * Any additional arguments are provided to `func` when it's invoked.
 *
 * @since 4.18.4
 * @category Util
 * @param {Function} func The function to attempt.
 * @param {*} defaultValue Default value in case `func` throws some error.
 * @param {...*} [args] The arguments to invoke `func` with.
 * @returns {*} Returns the `func` result or error object.
 * @example
 *
 * // Return document.body since argument is an invalid selector.
 * const elements = attemptOr(selector =>
 *   document.querySelectorAll(selector), document.body, '>_>')
 *
 */
function attemptOr(func, defaultValue, ...args) {
  try {
    return func(...args)
  } catch (e) {
    return defaultValue
  }
}

export default attemptOr
