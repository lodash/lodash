/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseCallback = require('lodash._basecallback'),
    isIterateeCall = require('lodash._isiterateecall');

/**
 * Creates a function bound to an optional `thisArg`. If `func` is a property
 * name the created callback returns the property value for a given element.
 * If `func` is an object the created callback returns `true` for elements
 * that contain the equivalent object properties, otherwise it returns `false`.
 *
 * @static
 * @memberOf _
 * @alias iteratee
 * @category Utility
 * @param {*} [func=_.identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
 * @returns {Function} Returns the callback.
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 }
 * ];
 *
 * // wrap to create custom callback shorthands
 * _.callback = _.wrap(_.callback, function(callback, func, thisArg) {
 *   var match = /^(.+?)__([gl]t)(.+)$/.exec(func);
 *   if (!match) {
 *     return callback(func, thisArg);
 *   }
 *   return function(object) {
 *     return match[2] == 'gt' ? object[match[1]] > match[3] : object[match[1]] < match[3];
 *   };
 * });
 *
 * _.filter(users, 'age__gt36');
 * // => [{ 'user': 'fred', 'age': 40 }]
 */
function callback(func, thisArg, guard) {
  if (guard && isIterateeCall(func, thisArg, guard)) {
    thisArg = null;
  }
  return baseCallback(func, thisArg);
}

module.exports = callback;
