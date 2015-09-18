import baseEachRight from './internal/baseEachRight';
import baseFind from './internal/baseFind';
import baseFindIndex from './internal/baseFindIndex';
import baseIteratee from './internal/baseIteratee';
import isArray from './isArray';

/**
 * This method is like `_.find` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object} collection The collection to search.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * _.findLast([1, 2, 3, 4], function(n) {
 *   return n % 2 == 1;
 * });
 * // => 3
 */
function findLast(collection, predicate) {
  predicate = baseIteratee(predicate, 3);
  if (isArray(collection)) {
    var index = baseFindIndex(collection, predicate, true);
    return index > -1 ? collection[index] : undefined;
  }
  return baseFind(collection, predicate, baseEachRight);
}

export default findLast;
