var baseCallback = require('../internal/baseCallback');

/**
 * This method is like `_.findIndex` except that it iterates over elements
 * of `collection` from right to left.
 *
 * If a property name is provided for `predicate` the created "_.property"
 * style callback returns the property value of the given element.
 *
 * If an object is provided for `predicate` the created "_.matches" style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to search.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration. If a property name or object is provided it is used to
 *  create a "_.property" or "_.matches" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': false }
 * ];
 *
 * _.findLastIndex(users, function(chr) { return chr.age < 40; });
 * // => 2
 *
 * // using the "_.matches" callback shorthand
 * _.findLastIndex(users, { 'age': 40 });
 * // => 1
 *
 * // using the "_.property" callback shorthand
 * _.findLastIndex(users, 'active');
 * // => 0
 */
function findLastIndex(array, predicate, thisArg) {
  var length = array ? array.length : 0;
  predicate = baseCallback(predicate, thisArg, 3);
  while (length--) {
    if (predicate(array[length], length, array)) {
      return length;
    }
  }
  return -1;
}

module.exports = findLastIndex;
