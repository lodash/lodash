/**
 * lodash 3.1.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseEach = require('lodash._baseeach'),
    baseFlatten = require('lodash._baseflatten'),
    baseSortByOrder = require('lodash._basesortbyorder'),
    isIterateeCall = require('lodash._isiterateecall'),
    isArguments = require('lodash.isarguments'),
    isArray = require('lodash.isarray');

/**
 * This method is like `_.sortBy` except that it sorts by property names
 * instead of an iteratee function.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {...(string|string[])} props The property names to sort by,
 *  specified as individual property names or arrays of property names.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 26 },
 *   { 'user': 'fred',   'age': 30 }
 * ];
 *
 * _.map(_.sortByAll(users, ['user', 'age']), _.values);
 * // => [['barney', 26], ['barney', 36], ['fred', 30], ['fred', 40]]
 */
function sortByAll() {
  var args = arguments,
      collection = args[0],
      guard = args[3],
      index = 0,
      length = args.length - 1;

  if (collection == null) {
    return [];
  }
  var props = Array(length);
  while (index < length) {
    props[index] = args[++index];
  }
  if (guard && isIterateeCall(args[1], args[2], guard)) {
    props = args[1];
  }
  return baseSortByOrder(collection, baseFlatten(props), []);
}

module.exports = sortByAll;
