/**
 * lodash 4.3.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseClone = require('lodash._baseclone'),
    baseIteratee = require('lodash._baseiteratee');

/**
 * Creates a function that invokes `func` with the arguments of the created
 * function. If `func` is a property name the created callback returns the
 * property value for a given element. If `func` is an object the created
 * callback returns `true` for elements that contain the equivalent object
 * properties, otherwise it returns `false`.
 *
 * @static
 * @memberOf _
 * @category Util
 * @param {*} [func=_.identity] The value to convert to a callback.
 * @returns {Function} Returns the callback.
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 }
 * ];
 *
 * // Create custom iteratee shorthands.
 * _.iteratee = _.wrap(_.iteratee, function(callback, func) {
 *   var p = /^(\S+)\s*([<>])\s*(\S+)$/.exec(func);
 *   return !p ? callback(func) : function(object) {
 *     return (p[2] == '>' ? object[p[1]] > p[3] : object[p[1]] < p[3]);
 *   };
 * });
 *
 * _.filter(users, 'age > 36');
 * // => [{ 'user': 'fred', 'age': 40 }]
 */
function iteratee(func) {
  return baseIteratee(typeof func == 'function' ? func : baseClone(func, true));
}

module.exports = iteratee;
