import isSymbol from './isSymbol.js'

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
 * const objects = [{ 'n': 1 }, { 'n': 2 }]
 *
 * minBy(objects, ({ n }) => n)
 * // => { 'n': 1 }
 */
function minBy(array, iteratee) {
  let result
  if (array == null) {
    return result
  }
  let computed
  for (const value of array) {
    const current = iteratee(value)

    if (current != null && (computed === undefined
      ? (current === current && !isSymbol(current))
      : (current < computed)
    )) {
      computed = current
      result = value
    }
  }
  return result
}

export default minBy
