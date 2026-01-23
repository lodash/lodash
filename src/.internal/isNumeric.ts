/**
 * Checks if `value` is classified as a `Number` primitive or object.
 * This type guard validates if a value can be safely used in numeric operations.
 *
 * @since 4.18.0
 * @category Lang
 * @param value The value to check.
 * @returns Returns `true` if `value` is a number (including NaN, Infinity),
 *  else `false`.
 * @example
 *
 * isNumeric(3)
 * // => true
 *
 * isNumeric(Number.MIN_VALUE)
 * // => true
 *
 * isNumeric(Infinity)
 * // => true
 *
 * isNumeric(NaN)
 * // => true
 *
 * isNumeric('3')
 * // => false
 *
 * isNumeric([1, 2, 3])
 * // => false
 *
 * isNumeric({ value: 3 })
 * // => false
 *
 * isNumeric(Symbol('3'))
 * // => false
 */
function isNumeric(value: unknown): value is number {
  return typeof value === 'number'
}

export default isNumeric
