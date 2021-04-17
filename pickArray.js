import map from './map.js'
import flatten from './flatten.js'

/**
 * Creates an array containing the picked `object` properties.
 *
 * @since 5.0.0
 * @category Array
 * @param {Array} arr The source array.
 * @param {string} key The property to pick.
 * @returns {Array} Returns the new array.
 * @example
 *
 * const arr = [
 *   { 'a': 1, 'b': 2 },
 *   { 'a': 1, 'b': 3 },
 *   { 'a': 2, 'b': 4 }
 * ]
 *
 * pickArray(arr, 'a')
 * // => [1, 1, 2]
 */
function pickArray(arr, key) {
  return arr == null ? [] : flatten(
    map(arr, (object) => object[key])
  )
}

export default pickArray
