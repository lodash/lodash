/**
 * Checks if `value` is less than `other`.
 *
 * @since 3.9.0
 * @category Lang
 * @example
 *   lt(1, 3)
 *   // => true
 *
 *   lt(3, 3)
 *   // => false
 *
 *   lt(3, 1)
 *   // => false
 *
 * @param {any} value The value to compare.
 * @param {any} other The other value to compare.
 * @see gt, gte, lte
 * @returns {boolean} Returns `true` if `value` is less than `other`, else `false`.
 */
function lt(value, other) {
  if (!(typeof value === 'string' && typeof other === 'string')) {
    value = +value
    other = +other
  }
  return value < other
}

export default lt
