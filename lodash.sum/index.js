/**
 * lodash 3.4.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var toIterable = require('lodash._toiterable'),
    isArray = require('lodash.isarray');

/**
 * Gets the sum of the values in `collection`.
 *
 * @static
 * @memberOf _
 * @category Math
 * @param {Array|Object|string} collection The collection to iterate over.
 * @returns {number} Returns the sum.
 * @example
 *
 * _.sum([4, 6, 2]);
 * // => 12
 *
 * _.sum({ 'a': 4, 'b': 6, 'c': 2 });
 * // => 12
 */
function sum(collection) {
  if (!isArray(collection)) {
    collection = toIterable(collection);
  }
  var length = collection.length,
      result = 0;

  while (length--) {
    result += +collection[length] || 0;
  }
  return result;
}

module.exports = sum;
