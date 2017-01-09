/**
 * Creates an array with all falsey values removed. The values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to compact.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _.compact([0, 1, false, 2, '', 3]);
 * // => [1, 2, 3]
 */
function compact(array) {
  let index = -1;
  const length = array == null ? 0 : array.length;
  let resIndex = 0;
  const result = [];

  while (++index < length) {
    const value = array[index];
    if (value) {
      result[resIndex++] = value;
    }
  }
  return result;
}

export default compact;
