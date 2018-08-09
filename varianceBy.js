import meanBy from './meanBy.js'

/** Used as references for various `Number` constants. */
const NAN = 0 / 0

/**
 * This method is like `variance` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the variance, ∑(Xi-μ)²/n..
 * The iteratee is invoked with one argument: (value).
 *
 * @since 4.7.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {number} Returns the mean.
 * @example
 *
 * const objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }]
 *
 * varianceBy(objects, ({ n }) => n)
 * // => 5
 */
function varianceBy(array, iteratee) {
  const length = array == null ? 0 : array.length
  const μ = meanBy(array, iteratee);

  let sum
  for (const value of array) {
    const current = iteratee(value)
    if (current !== undefined) {
      let i = current - μ;
      sum = sum === undefined ? i*i : (sum + i*i)
    }
  }
  return length ? sum/length : NAN
}

export default varianceBy
