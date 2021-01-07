/**
 * Checks if `value` is greater than `other`.
 *
 * @since 3.9.0
 * @category Lang
 * @example
 *   gt(3, 1)
 *   // => true
 *
 *   gt(3, 3)
 *   // => false
 *
 *   gt(1, 3)
 *   // => false
 *
 * @param {any} value The value to compare.
 * @param {any} other The other value to compare.
 * @see gte, lt, lte
 * @returns {boolean} Returns `true` if `value` is greater than `other`, else `false`.
 */
function gt(value, other) {
  if (!(typeof value === 'string' && typeof other === 'string')) {
    value = +value
    other = +other
  }
  return value > other
}

export default gt
