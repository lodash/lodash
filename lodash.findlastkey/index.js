/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseCallback = require('lodash._basecallback'),
    baseFind = require('lodash._basefind'),
    baseForRight = require('lodash._baseforright'),
    keys = require('lodash.keys');

/**
 * The base implementation of `_.forOwnRight` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwnRight(object, iteratee) {
  return baseForRight(object, iteratee, keys);
}

/**
 * This method is like `_.findKey` except that it iterates over elements of
 * a collection in the opposite order.
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to search.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
 * @example
 *
 * var users = {
 *   'barney':  { 'age': 36, 'active': true },
 *   'fred':    { 'age': 40, 'active': false },
 *   'pebbles': { 'age': 1,  'active': true }
 * };
 *
 * _.findLastKey(users, function(chr) {
 *   return chr.age < 40;
 * });
 * // => returns `pebbles` assuming `_.findKey` returns `barney`
 *
 * // using the `_.matches` callback shorthand
 * _.findLastKey(users, { 'age': 36, 'active': true });
 * // => 'barney'
 *
 * // using the `_.matchesProperty` callback shorthand
 * _.findLastKey(users, 'active', false);
 * // => 'fred'
 *
 * // using the `_.property` callback shorthand
 * _.findLastKey(users, 'active');
 * // => 'pebbles'
 */
function findLastKey(object, predicate, thisArg) {
  predicate = baseCallback(predicate, thisArg, 3);
  return baseFind(object, predicate, baseForOwnRight, true);
}

module.exports = findLastKey;
