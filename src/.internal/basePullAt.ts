import baseUnset from './baseUnset.js'
import isIndex from './isIndex.js'

/**
 * The base implementation of `pullAt` without support for individual
 * indexes or capturing the removed elements.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {number[]} indexes The indexes of elements to remove.
 * @returns {Array} Returns `array`.
 */
function basePullAt(array, indexes) {
  let length = array ? indexes.length : 0
  const lastIndex = length - 1

  while (length--) {
    let previous
    const index = indexes[length]
    if (length === lastIndex || index !== previous) {
      previous = index
      if (isIndex(index)) {
        array.splice(index, 1)
      } else {
        baseUnset(array, index)
      }
    }
  }
  return array
}

export default basePullAt
