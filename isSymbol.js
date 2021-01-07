import getTag from './.internal/getTag.js'

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @since 4.0.0
 * @category Lang
 * @example
 *   isSymbol(Symbol.iterator)
 *   // => true
 *
 *   isSymbol('abc')
 *   // => false
 *
 * @param {any} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 */
function isSymbol(value) {
  const type = typeof value
  return (
    type == 'symbol' ||
    (type === 'object' && value != null && getTag(value) == '[object Symbol]')
  )
}

export default isSymbol
