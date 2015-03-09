/**
 * lodash 3.4.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseEach = require('lodash._baseeach'),
    baseSortByOrder = require('lodash._basesortbyorder'),
    isIterateeCall = require('lodash._isiterateecall'),
    isArray = require('lodash.isarray');

/**
 * This method is like `_.sortByAll` except that it allows specifying the
 * sort orders of the property names to sort by. A truthy value in `orders`
 * will sort the corresponding property name in ascending order while a
 * falsey value will sort it in descending order.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {string[]} props The property names to sort by.
 * @param {boolean[]} orders The sort orders of `props`.
 * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 26 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 30 }
 * ];
 *
 * // sort by `user` in ascending order and by `age` in descending order
 * _.map(_.sortByOrder(users, ['user', 'age'], [true, false]), _.values);
 * // => [['barney', 36], ['barney', 26], ['fred', 40], ['fred', 30]]
 */
function sortByOrder(collection, props, orders, guard) {
  if (collection == null) {
    return [];
  }
  if (guard && isIterateeCall(props, orders, guard)) {
    orders = null;
  }
  if (!isArray(props)) {
    props = props == null ? [] : [props];
  }
  if (!isArray(orders)) {
    orders = orders == null ? [] : [orders];
  }
  return baseSortByOrder(collection, props, orders);
}

module.exports = sortByOrder;
