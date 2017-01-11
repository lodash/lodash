import copyArray from './copyArray.js';
import isIndex from './isIndex.js';

/* Built-in method references for those with the same name as other `lodash` methods. */
const nativeMin = Math.min;

/**
 * Reorder `array` according to the specified indexes where the element at
 * the first index is assigned as the first element, the element at
 * the second index is assigned as the second element, and so on.
 *
 * @private
 * @param {Array} array The array to reorder.
 * @param {Array} indexes The arranged array indexes.
 * @returns {Array} Returns `array`.
 */
function reorder(array, indexes) {
  const arrLength = array.length;
  let length = nativeMin(indexes.length, arrLength);
  const oldArray = copyArray(array);

  while (length--) {
    const index = indexes[length];
    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
  }
  return array;
}

export default reorder;
