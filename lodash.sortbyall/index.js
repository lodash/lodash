/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseCompareAscending = require('lodash._basecompareascending'),
    baseEach = require('lodash._baseeach'),
    baseFlatten = require('lodash._baseflatten'),
    baseSortBy = require('lodash._basesortby'),
    isIterateeCall = require('lodash._isiterateecall');

/**
 * Used by `_.sortByAll` to compare multiple properties of each element
 * in a collection and stable sort them in ascending order.
 *
 * @private
 * @param {Object} object The object to compare to `other`.
 * @param {Object} other The object to compare to `object`.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareMultipleAscending(object, other) {
  var index = -1,
      objCriteria = object.criteria,
      othCriteria = other.criteria,
      length = objCriteria.length;

  while (++index < length) {
    var result = baseCompareAscending(objCriteria[index], othCriteria[index]);
    if (result) {
      return result;
    }
  }
  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
  // that causes it, under certain circumstances, to provide the same value for
  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
  // for more details.
  //
  // This also ensures a stable sort in V8 and other engines.
  // See https://code.google.com/p/v8/issues/detail?id=90 for more details.
  return object.index - other.index;
}

/**
 * Used as the maximum length of an array-like value.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on ES `ToLength`. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
 * for more details.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

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
function sortByAll(collection) {
  var args = arguments;
  if (args.length > 3 && isIterateeCall(args[1], args[2], args[3])) {
    args = [collection, args[1]];
  }
  var index = -1,
      length = collection ? collection.length : 0,
      props = baseFlatten(args, false, false, 1),
      result = isLength(length) ? Array(length) : [];

  baseEach(collection, function(value) {
    var length = props.length,
        criteria = Array(length);

    while (length--) {
      criteria[length] = value == null ? undefined : value[props[length]];
    }
    result[++index] = { 'criteria': criteria, 'index': index, 'value': value };
  });
  return baseSortBy(result, compareMultipleAscending);
}

module.exports = sortByAll;
