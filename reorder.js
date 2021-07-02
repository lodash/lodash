import map from './map.js'
import baseProperty from './.internal/baseProperty.js'
import isArrayLikeObject from './isArrayLikeObject.js'

/**
 * This Method accepts an array
 * elements and creates an array with re-order from index
 *
 * @since x.xx.xx
 * @category Array
 * @param {Array} which array you want to re-ordering.
 * @returns {Array} Returns a new array ordered from your index
 * @example
 *
 * const order_from_0 = reorder([0, 1, 2, 3], 0);
 * // => [0, 1, 2, 3]
 *
 * const order_from_1 = reorder([0, 1, 2, 3], 1);
 * // => [1, 2, 3, 0]
 *
 * const order_from_2 = reorder([0, 1, 2, 3], 2);
 * // => [2, 3, 0, 1]
 */
function reorder(array, fromIndex = 0) {
  if (!(array != null && array.length)) {
    return []
  }
  
  // select first part
  let _first = array.slice(0, fromIndex);
  
  // select last part
  let _last = array.slice(fromIndex);
  
  // swap place and return new array
  return [..._last, ..._first];
}

export default reorder
