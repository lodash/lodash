/**
 * Checks if `value` is greater than or equal to `other`.
 *
 * @since 3.9.0
 * @category Lang
 * @example
 *   gte(3, 1)
 *   // => true
 *
 *   gte(3, 3)
 *   // => true
 *
 *   gte(1, 3)
 *   // => false
 *
 * @param {any} value The value to compare.
 * @param {any} other The other value to compare.
 * @see gt, lt, lte
 * @returns {boolean} Returns `true` if `value` is greater than or equal to
 *   `other`, else `false`.
 */
function gte(value, other) {
  if (!(typeof value === 'string' && typeof other === 'string')) {
    value = +value
    other = +other
  }
  return value >= other
}

export default gte
