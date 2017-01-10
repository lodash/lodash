import baseFindIndex from './.internal/baseFindIndex.js';
import toInteger from './toInteger.js';

/* Built-in method references for those with the same name as other `lodash` methods. */
const nativeMax = Math.max;

/**
 * This method is like `find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @since 1.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * findIndex(users, function(o) { return o.user == 'barney'; });
 * // => 0
 */
function findIndex(array, predicate, fromIndex) {
  const length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  let index = fromIndex == null ? 0 : toInteger(fromIndex);
  if (index < 0) {
    index = nativeMax(length + index, 0);
  }
  return baseFindIndex(array, predicate, index);
}

export default findIndex;
