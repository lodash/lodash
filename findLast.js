var findLastIndex = require('./findLastIndex'),
    isArrayLike = require('./isArrayLike'),
    values = require('./values');

/**
 * This method is like `_.find` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to search.
 * @param {Array|Function|Object|string} [predicate=_.identity]
 *  The function invoked per iteration.
 * @param {number} [fromIndex=collection.length-1] The index to search from.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * _.findLast([1, 2, 3, 4], function(n) {
 *   return n % 2 == 1;
 * });
 * // => 3
 */
function findLast(collection, predicate, fromIndex) {
  collection = isArrayLike(collection) ? collection : values(collection);
  var index = findLastIndex(collection, predicate, fromIndex);
  return index > -1 ? collection[index] : undefined;
}

module.exports = findLast;
