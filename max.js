import isSymbol from './isSymbol.js';

/**
 * Computes the maximum value of `array`. If `array` is empty or falsey,
 * `undefined` is returned.
 *
 * @since 0.1.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {*} Returns the maximum value.
 * @example
 *
 * max([4, 2, 8, 6]);
 * // => 8
 *
 * max([]);
 * // => undefined
 */
function max(array) {
  let result;
  let index = -1;
  const length = array ? array.length : 0;

  while (++index < length) {
    let computed;
    const value = array[index];

    if (value != null && (computed === undefined
          ? (value === value && !isSymbol(value))
          : (value > computed)
        )) {
      computed = value;
      result = value;
    }
  }
  return result;
}

export default max;
