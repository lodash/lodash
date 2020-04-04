/**
 * Sorts an array of elements and returns the minimum and maximum values.
 * If the passed array is empty, an empty array is returned.
 *
 * @since 5.0.0
 * @category Array
 * @param {Array} array The array to process.
 * @returns {Array} Returns a new array of the minimum and maximum values.
 * @example
 *
 * bounds([200, 100, 250, 150])
 * // => [100, 250]
 *
 * bounds(['beaver', 'alpaca', 'zebra', 'duck'])
 * // => ['alpaca', 'zebra']
 */
function bounds(array) {
  if (array.length) {
    array.sort()
    return [array[0], array[array.length-1]]
  }
  return []
}

export default bounds
