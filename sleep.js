/**
 * Returns a resolved promise after `wait` milliseconds.
 *
 * @since 4.17.16
 * @category Function
 * @param {number} wait The number of milliseconds to wait.
 * @returns {promise} Returns a Promise.
 * @example
 *
 * sleep(1000)
 * // => Promise
 */
function sleep(wait) {
  return new Promise((resolve) => setTimeout(resolve, +wait || 0))
}

export default sleep
