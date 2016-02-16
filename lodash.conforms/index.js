/**
 * lodash 4.3.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseClone = require('lodash._baseclone'),
    keys = require('lodash.keys');

/**
 * The base implementation of `_.conforms` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property predicates to conform to.
 * @returns {Function} Returns the new function.
 */
function baseConforms(source) {
  var props = keys(source),
      length = props.length;

  return function(object) {
    if (object == null) {
      return !length;
    }
    var index = length;
    while (index--) {
      var key = props[index],
          predicate = source[key],
          value = object[key];

      if ((value === undefined && !(key in Object(object))) || !predicate(value)) {
        return false;
      }
    }
    return true;
  };
}

/**
 * Creates a function that invokes the predicate properties of `source` with
 * the corresponding property values of a given object, returning `true` if
 * all predicates return truthy, else `false`.
 *
 * @static
 * @memberOf _
 * @category Util
 * @param {Object} source The object of property predicates to conform to.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 }
 * ];
 *
 * _.filter(users, _.conforms({ 'age': _.partial(_.gt, _, 38) }));
 * // => [{ 'user': 'fred', 'age': 40 }]
 */
function conforms(source) {
  return baseConforms(baseClone(source, true));
}

module.exports = conforms;
