/**
 * Checks if `value` is less than or equal to `other`.
 *
 * @since 3.9.0
 * @category Lang
 * @example
 *   lte(1, 3)
 *   // => true
 *
 *   lte(3, 3)
 *   // => true
 *
 *   lte(3, 1)
 *   // => false
 *
 * @param {any} value The value to compare.
 * @param {any} other The other value to compare.
 * @see gt, gte, lt
 * @returns {boolean} Returns `true` if `value` is less than or equal to
 *   `other`, else `false`.
 */
function lte(value, other) {
  if (!(typeof value === 'string' && typeof other === 'string')) {
    value = +value
    other = +other
  }
  return value <= other
}

export default lte
