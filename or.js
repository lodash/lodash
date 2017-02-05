
/**
 * Performs logical disjunction(||) on pair of arguments.
 *
 * @since 4.18.0
 * @category Lang
 * @param {boolean} left First argument
 * @param {boolean} right Second argument
 * @returns {boolean} Result of logical disjunction (||).
 * @example
 *
 * or(true, true);
 * // => true
 *
 * or(true, false);
 * // => true
 *
 * or(false, true);
 * // => true
 *
 * or(false, false);
 * // => false
 */
function or(left, right) {
  return left || right;
}

export default or;
