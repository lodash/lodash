/**
 * lodash 3.1.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseCallback = require('lodash._basecallback'),
    binaryIndex = require('lodash._binaryindex'),
    binaryIndexBy = require('lodash._binaryindexby');

/**
 * Creates a `_.sortedIndex` or `_.sortedLastIndex` function.
 *
 * @private
 * @param {boolean} [retHighest] Specify returning the highest qualified index.
 * @returns {Function} Returns the new index function.
 */
function createSortedIndex(retHighest) {
  return function(array, value, iteratee, thisArg) {
    return iteratee == null
      ? binaryIndex(array, value, retHighest)
      : binaryIndexBy(array, value, baseCallback(iteratee, thisArg, 1), retHighest);
  };
}

/**
 * This method is like `_.sortedIndex` except that it returns the highest
 * index at which `value` should be inserted into `array` in order to
 * maintain its sort order.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {Function|Object|string} [iteratee=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 * @example
 *
 * _.sortedLastIndex([4, 4, 5, 5], 5);
 * // => 4
 */
var sortedLastIndex = createSortedIndex(true);

module.exports = sortedLastIndex;
