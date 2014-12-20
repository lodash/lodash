/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseCallback = require('lodash._basecallback'),
    baseSlice = require('lodash._baseslice');

/**
 * Creates a slice of `array` excluding elements dropped from the end.
 * Elements are dropped until `predicate` returns falsey. The predicate is
 * bound to `thisArg` and invoked with three arguments; (value, index, array).
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that match the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to query.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * _.dropRightWhile([1, 2, 3], function(n) {
 *   return n > 1;
 * });
 * // => [1]
 *
 * var users = [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': false }
 * ];
 *
 * // using the `_.matches` callback shorthand
 * _.pluck(_.dropRightWhile(users, { 'user': 'pebbles', 'active': false }), 'user');
 * // => ['barney', 'fred']
 *
 * // using the `_.matchesProperty` callback shorthand
 * _.pluck(_.dropRightWhile(users, 'active', false), 'user');
 * // => ['barney']
 *
 * // using the `_.property` callback shorthand
 * _.pluck(_.dropRightWhile(users, 'active'), 'user');
 * // => ['barney', 'fred', 'pebbles']
 */
function dropRightWhile(array, predicate, thisArg) {
  var length = array ? array.length : 0;
  if (!length) {
    return [];
  }
  predicate = baseCallback(predicate, thisArg, 3);
  while (length-- && predicate(array[length], length, array)) {}
  return baseSlice(array, 0, length + 1);
}

module.exports = dropRightWhile;
