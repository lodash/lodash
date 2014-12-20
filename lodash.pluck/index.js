/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseProperty = require('lodash._baseproperty'),
    map = require('lodash.map');

/**
 * Gets the value of `key` from all elements in `collection`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {string} key The key of the property to pluck.
 * @returns {Array} Returns the property values.
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 }
 * ];
 *
 * _.pluck(users, 'user');
 * // => ['barney', 'fred']
 *
 * var userIndex = _.indexBy(users, 'user');
 * _.pluck(userIndex, 'age');
 * // => [36, 40] (iteration order is not guaranteed)
 */
function pluck(collection, key) {
  return map(collection, property(key));
}

/**
 * Creates a function which returns the property value of `key` on a given object.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var users = [
 *   { 'user': 'fred' },
 *   { 'user': 'barney' }
 * ];
 *
 * var getName = _.property('user');
 *
 * _.map(users, getName);
 * // => ['fred', barney']
 *
 * _.pluck(_.sortBy(users, getName), 'user');
 * // => ['barney', 'fred']
 */
function property(key) {
  return baseProperty(key + '');
}

module.exports = pluck;
