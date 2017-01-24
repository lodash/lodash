import baseClamp from './.internal/baseClamp.js';
import toNumber from './toNumber.js';

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
 * clamp(-10, -5, 5);
 * // => -5
 *
 * clamp(10, -5, 5);
 * // => 5
 */
function clamp(number, lower, upper) {
  lower = toNumber(lower);
  lower = lower === lower ? lower : 0;

  upper = toNumber(upper);
  upper = upper === upper ? upper : 0;

  return baseClamp(toNumber(number), lower, upper);
}

export default clamp;
