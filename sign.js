import isNumber from './isNumber';

/**
 * Returns a number representing the sign of `value`.
 *
 * If `value` is a positive number, negative number, positive zero or negative zero,
 * the function will return 1, -1, 0 or -0 respectively. Otherwise, NaN is returned.
 *
 * @since 4.18.0
 * @category Math
 * @param {number} value A number
 * @returns {number} A number representing the sign
 * @example
 *
 * sign(10)
 * // => 1
 *
 * sign(-10)
 * // => -1
 */
function sign(value) {
  let sign = NaN;

  if (isNumber(value)) {
    if (value === 0) {
      sign = value;
    }
    else if (value >= 1) {
      sign = 1;
    }
    else if (value <= -1) {
      sign = -1;
    }
  }

  return sign;
}

export default sign
