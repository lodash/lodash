/**
 * Converts `fraction` to a percentage format string.
 *
 * @category Lang
 * @param {number} fraction The value to process.
 * @param {number} [minPrecision=0] - Minimum fraction digits, default is 0.
 * @param {number} [maxPrecision=2] - Maximum fraction digits, default is 2.
 * @returns {string} Returns the percentage string.
 * @example
 *
 * toPercent(0.2)
 * // => 20%
 *
 * toPercent(0.3333333)
 * // => 33.33%
 *
 * toPercent(0.2, 2)
 * // => 20.00%
 *
 */
export default function toPercent(fraction: number, minPrecision: number = 0, maxPrecision: number = 2) {
  return new Intl.NumberFormat('default', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(fraction);
}
