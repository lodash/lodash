import baseExtremum from './.internal/baseExtremum.js';
import baseLt from './.internal/baseLt.js';

/**
 * This method is like `min` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * the value is ranked. The iteratee is invoked with one argument: (value).
 *
 * @since 4.0.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {*} Returns the minimum value.
 * @example
 *
 * const objects = [{ 'n': 1 }, { 'n': 2 }];
 *
 * minBy(objects, o => o.n);
 * // => { 'n': 1 }
 */
function minBy(array, iteratee) {
  return (array && array.length)
    ? baseExtremum(array, iteratee, baseLt)
    : undefined;
}

export default minBy;
