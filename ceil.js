import createRound from './.internal/createRound.js'

/**
 * Computes `number` rounded up to `precision`. (Round up: the smallest integer
 * greater than or equal to a given number.)
 *
 * @since 3.10.0
 * @category Math
 * @example
 *   ceil(4.006)
 *   // => 5
 *
 *   ceil(6.004, 2)
 *   // => 6.01
 *
 *   ceil(6040, -2)
 *   // => 6100
 *
 * @param {number} number The number to round up.
 * @param {number} [precision] The precision to round up to. Default is `0`
 * @returns {number} Returns the rounded up number.
 */
const ceil = createRound('ceil')

export default ceil
