/**
 * Applies a function over given set of values, returning a new collection composed of the
 * results. If any function returns `null`, that value is instead discarded and excluded
 * from the resulting collection. Note that a falsy, nonnull value will still be retained in the
 * result array. The reason for this is to allow mapping to commonly-used falsy values, such as 0,
 * "", etc.
 *
 * @category Array
 * @param {Array} array - The array to iterate over
 * @param {function} f - The function used to produce mapper results
 * @example
 *
 * function currentAge(birthYear, currentYear) {
 *   return year <= currentYear ? currentYear - year : null
 * }
 *
 * filterMap(
 *   [1942, 1978, 2000, 2021, 2022, 2030, 2045],
 *   year => currentAge(year, 2021)
 * ) // => [79, 43, 21, 0]
 */
function filterMap(array, f) {
  const result = []
  array.forEach(element => {
    // Apply the mapper function to the element, returning a mapped value
    const mapped = f(element)
    if (mapped !== null) {
      // If our mapped value is nonnull, append it to result
      result.append(mapped)
    } // If not, our mapped value is considered 'filtered out'
  })
  return result
}

export default filterMap
