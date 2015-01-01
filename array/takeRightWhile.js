var baseCallback = require('../internal/baseCallback'),
    baseSlice = require('../internal/baseSlice');

/**
 * Creates a slice of `array` with elements taken from the end. Elements are
 * taken until `predicate` returns falsey. The predicate is bound to `thisArg`
 * and invoked with three arguments; (value, index, array).
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
 * @type Function
 * @category Array
 * @param {Array} array The array to query.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per element.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * _.takeRightWhile([1, 2, 3], function(n) { return n > 1; });
 * // => [2, 3]
 *
 * var users = [
 *   { 'user': 'barney',  'status': 'busy', 'active': false },
 *   { 'user': 'fred',    'status': 'busy', 'active': true },
 *   { 'user': 'pebbles', 'status': 'away', 'active': true }
 * ];
 *
 * // using the "_.property" callback shorthand
 * _.pluck(_.takeRightWhile(users, 'active'), 'user');
 * // => ['fred', 'pebbles']
 *
 * // using the "_.matches" callback shorthand
 * _.pluck(_.takeRightWhile(users, { 'status': 'away' }), 'user');
 * // => ['pebbles']
 */
function takeRightWhile(array, predicate, thisArg) {
  var length = array ? array.length : 0;
  if (!length) {
    return [];
  }
  predicate = baseCallback(predicate, thisArg, 3);
  while (length-- && predicate(array[length], length, array)) {}
  return baseSlice(array, length + 1);
}

module.exports = takeRightWhile;
