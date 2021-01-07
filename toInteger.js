import toFinite from './toFinite.js'

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @since 4.0.0
 * @category Lang
 * @example
 *   toInteger(3.2)
 *   // => 3
 *
 *   toInteger(Number.MIN_VALUE)
 *   // => 0
 *
 *   toInteger(Infinity)
 *   // => 1.7976931348623157e+308
 *
 *   toInteger('3.2')
 *   // => 3
 *
 * @param {any} value The value to convert.
 * @see isInteger, isNumber, toNumber
 * @returns {number} Returns the converted integer.
 */
function toInteger(value) {
  const result = toFinite(value)
  const remainder = result % 1

  return remainder ? result - remainder : result
}

export default toInteger
