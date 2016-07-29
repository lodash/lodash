/**
 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseAt = require('lodash._baseat'),
    baseCompareAscending = require('lodash._basecompareascending'),
    baseFlatten = require('lodash._baseflatten'),
    basePullAt = require('lodash._basepullat'),
    restParam = require('lodash.restparam');

/**
 * Removes elements from `array` corresponding to the given indexes and returns
 * an array of the removed elements. Indexes may be specified as an array of
 * indexes or as individual arguments.
 *
 * **Note:** Unlike `_.at`, this method mutates `array`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to modify.
 * @param {...(number|number[])} [indexes] The indexes of elements to remove,
 *  specified as individual indexes or arrays of indexes.
 * @returns {Array} Returns the new array of removed elements.
 * @example
 *
 * var array = [5, 10, 15, 20];
 * var evens = _.pullAt(array, 1, 3);
 *
 * console.log(array);
 * // => [5, 15]
 *
 * console.log(evens);
 * // => [10, 20]
 */
var pullAt = restParam(function(array, indexes) {
  indexes = baseFlatten(indexes);

  var result = baseAt(array, indexes);
  basePullAt(array, indexes.sort(baseCompareAscending));
  return result;
});

module.exports = pullAt;
