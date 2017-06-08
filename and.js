
/**
 * Performs logical conjunction(&&) on pair of arguments.
 *
 * @since 4.18.0
 * @category Lang
 * @param {boolean} left First argument
 * @param {boolean} right Second argument
 * @returns {boolean} Result of logical conjunction (&&).
 * @example
 *
 * and(true, true);
 * // => true
 *
 * and(true, false);
 * // => false
 *
 * and(false, true);
 * // => false
 *
 * and(false, false);
 * // => false
 */
function and(left, right) {
  return left && right;
}

export default and;
