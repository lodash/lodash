import baseOrderBy from './.internal/baseOrderBy.js'

/** Used as references for various `Number` constants. */
const NAN = 0 / 0

/**
 * This method is like `median` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the (n+1)/2 th value.
 * The iteratee is invoked with one argument: (value).
 *
 * @since 4.7.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {number} Returns the median, sorts the list and gets the (n+1)/2 th number.
 * @example
 *
 * const objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }]
 *
 * medianBy(objects, ({ n }) => n)
 * // => 4
 */
function medianBy(array, iteratee) {
  //Uses http://www.statisticshowto.com/probability-and-statistics/statistics-definitions/median-formula/
  const n = array == null ? 0 : array.length
  //We have to use (n+1/2) - 1, array start with 0 index in computers
  return n ? (baseOrderBy(array, iteratee)[(n+1)/2 - 1]) : NAN
}

export default medianBy
