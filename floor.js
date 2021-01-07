import createRound from './.internal/createRound.js'

/**
 * Computes `number` rounded down to `precision`.
 *
 * @since 3.10.0
 * @category Math
 * @example
 *   floor(4.006)
 *   // => 4
 *
 *   floor(0.046, 2)
 *   // => 0.04
 *
 *   floor(4060, -2)
 *   // => 4000
 *
 * @param {number} number The number to round down.
 * @param {number} [precision] The precision to round down to. Default is `0`
 * @returns {number} Returns the rounded down number.
 */
const floor = createRound('floor')

export default floor
