/**
 * lodash 3.4.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseCompareAscending = require('lodash._basecompareascending'),
    baseEach = require('lodash._baseeach'),
    baseSortBy = require('lodash._basesortby');

/**
 * Used by `_.sortByOrder` to compare multiple properties of each element
 * in a collection and stable sort them in the following order:
 *
 * If orders is unspecified, sort in ascending order for all properties.
 * Otherwise, for each property, sort in ascending order if its corresponding value in
 * orders is true, and descending order if false.
 *
 * @private
 * @param {Object} object The object to compare to `other`.
 * @param {Object} other The object to compare to `object`.
 * @param {boolean[]} orders The order to sort by for each property.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareMultiple(object, other, orders) {
  var index = -1,
      objCriteria = object.criteria,
      othCriteria = other.criteria,
      length = objCriteria.length,
      ordersLength = orders.length;

  while (++index < length) {
    var result = baseCompareAscending(objCriteria[index], othCriteria[index]);
    if (result) {
      if (index >= ordersLength) {
        return result;
      } else {
        return orders[index] ? result : result * -1;
      }
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
 * The base implementation of `_.sortByOrder` without param guards.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {string[]} props The property names to sort by.
 * @param {boolean[]} orders The sort orders of `props`.
 * @returns {Array} Returns the new sorted array.
 */
function baseSortByOrder(collection, props, orders) {
  var index = -1,
      length = collection.length,
      result = isLength(length) ? Array(length) : [];

  baseEach(collection, function(value) {
    var length = props.length,
        criteria = Array(length);

    while (length--) {
      criteria[length] = value == null ? undefined : value[props[length]];
    }
    result[++index] = { 'criteria': criteria, 'index': index, 'value': value };
  });

  return baseSortBy(result, function(object, other) {
    return compareMultiple(object, other, orders);
  });
}

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

module.exports = baseSortByOrder;
