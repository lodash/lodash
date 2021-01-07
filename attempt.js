import isError from './isError.js'

/**
 * Attempts to invoke `func`, returning either the result or the caught error
 * object. Any additional arguments are provided to `func` when it's invoked.
 *
 * @since 3.0.0
 * @category Util
 * @example
 *   // Avoid throwing errors for invalid selectors.
 *   const elements = attempt(
 *     (selector) => document.querySelectorAll(selector),
 *     '>_>'
 *   )
 *
 *   if (isError(elements)) {
 *     elements = []
 *   }
 *
 * @param {Function} func The function to attempt.
 * @param {any[]} [args] The arguments to invoke `func` with.
 * @returns {any} Returns the `func` result or error object.
 */
function attempt(func, ...args) {
  try {
    return func(...args)
  } catch (e) {
    return isError(e) ? e : new Error(e)
  }
}

export default attempt
