import isArray from '../lang/isArray';
import toIterable from '../internal/toIterable';

/**
 * Gets the sum of the values in `collection`.
 *
 * @static
 * @memberOf _
 * @category Math
 * @param {Array|Object|string} collection The collection to iterate over.
 * @returns {number} Returns the sum.
 * @example
 *
 * _.sum([4, 6, 2]);
 * // => 12
 *
 * _.sum({ 'a': 4, 'b': 6, 'c': 2 });
 * // => 12
 */
function sum(collection) {
  if (!isArray(collection)) {
    collection = toIterable(collection);
  }
  var length = collection.length,
      result = 0;

  while (length--) {
    result += +collection[length] || 0;
  }
  return result;
}

export default sum;
