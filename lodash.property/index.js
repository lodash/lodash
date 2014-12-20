/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseProperty = require('lodash._baseproperty');

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
 * // => ['fred', 'barney']
 *
 * _.pluck(_.sortBy(users, getName), 'user');
 * // => ['barney', 'fred']
 */
function property(key) {
  return baseProperty(key + '');
}

module.exports = property;
