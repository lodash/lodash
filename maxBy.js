import baseExtremum from './.internal/baseExtremum.js';
import baseGt from './.internal/baseGt.js';

/**
 * This method is like `max` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * the value is ranked. The iteratee is invoked with one argument: (value).
 *
 * @since 4.0.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {*} Returns the maximum value.
 * @example
 *
 * const objects = [{ 'n': 1 }, { 'n': 2 }];
 *
 * maxBy(objects, o => o.n);
 * // => { 'n': 2 }
 */
function maxBy(array, iteratee) {
  return (array && array.length)
    ? baseExtremum(array, iteratee, baseGt)
    : undefined;
}

export default maxBy;
