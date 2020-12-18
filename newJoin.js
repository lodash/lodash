/**
 * This method is like join except that it accepts another separator
 * for joining the last element
 *
 * @category Array
 * @param {Array} Array that we want to join it's elements
 * @param {String} Default separator
 * @param {String} Separator for joining last element of array
 * @returns {String} Returns the joint of array elements with separators
 * @example
 *
 * _.newJoin([1, 2, 3, 4], ", ");
 * _.newJoin([1, 2, 3, 4], ", ", " and ");
 *
 */
function newJoin(arr, sep, sepLast = undefined) {
  if (sepLast === undefined)
    return arr.join(sep);
  return arr.slice(0, arr.length-1).join(sep) + sepLast + arr[arr.length-1];
}

export default newJoin;
