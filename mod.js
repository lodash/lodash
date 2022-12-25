import createMathOperation from './.internal/createMathOperation.js'

/**
 * Return the modulus (remainder) of a division between two numbers.
 *
 * @since 5.0.0
 * @category Math
 * @param {number} dividend The number to perform the modulo operation on.
 * @param {number} divisor The divisor number in the modulo operation.
 * @returns {number} Returns the remainder.
 * @example
 *
 * mod(5, 2)
 * // => 1
 */
const mod = createMathOperation((dividend, divisor) => dividend % divisor, 0)

export default mod
