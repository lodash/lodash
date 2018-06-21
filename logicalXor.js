/**
 * Applies logical XOR on two boolean expressions and returns the result.
 *
 * @since 4.0.0
 * @category Lang
 * @param {boolean} expression The expression to compare.
 * @param {boolean} other The other expression to compare.
 * @returns {boolean} Returns `true` if only one of the expressions is `true`, else returns `false`.
 * @example
 *
 * logicalXor(1 > 3, 2 == 2)
 * // => true
 *
 * logicalXor(1 < 3, 2 == 4)
 * // => true
 *
 * logicalXor(1 > 3, 2 == 4)
 * // => false
 *
 * logicalXor(1 < 3, 2 == 2)
 * // => false
 */
function logicalXor (expression, other) {
  return expression ? !other : other
}

export default logicalXor
