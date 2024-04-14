/**
 * Clamps `number` within the inclusive `lower` and `upper` bounds.
 *
 * @since 4.0.0
 * @category Number
 * @param {number} number The number to clamp.
 * @param {number} lower The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the clamped number.
 * @example
 *
 * clamp(-10, -5, 5)
 * // => -5
 *
 * clamp(10, -5, 5)
 * // => 5
 */
function clamp(number: number, lower: number, upper: number) {
    number = +number;
    lower = +lower;
    upper = +upper;
    lower = lower === lower ? lower : 0;
    upper = upper === upper ? upper : 0;
    if (number === number) {
        number = number <= upper ? number : upper;
        number = number >= lower ? number : lower;
    }
    return number;
}

export default clamp;
