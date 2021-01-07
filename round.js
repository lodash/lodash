import createRound from './.internal/createRound.js'

/**
 * Computes `number` rounded to `precision`.
 *
 * @since 3.10.0
 * @category Math
 * @example
 *   round(4.006)
 *   // => 4
 *
 *   round(4.006, 2)
 *   // => 4.01
 *
 *   round(4060, -2)
 *   // => 4100
 *
 * @param {number} number The number to round.
 * @param {number} [precision] The precision to round to. Default is `0`
 * @returns {number} Returns the rounded number.
 */
const round = createRound('round')

export default round
