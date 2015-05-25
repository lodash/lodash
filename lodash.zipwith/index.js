/**
 * lodash 3.8.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var restParam = require('lodash.restparam'),
    unzipWith = require('lodash.unzipwith');

/**
 * This method is like `_.zip` except that it accepts an iteratee to specify
 * how grouped values should be combined. The `iteratee` is bound to `thisArg`
 * and invoked with four arguments: (accumulator, value, index, group).
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {...Array} [arrays] The arrays to process.
 * @param {Function} [iteratee] The function to combine grouped values.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array} Returns the new array of grouped elements.
 * @example
 *
 * _.zipWith([1, 2], [10, 20], [100, 200], _.add);
 * // => [111, 222]
 */
var zipWith = restParam(function(arrays) {
  var length = arrays.length,
      iteratee = arrays[length - 2],
      thisArg = arrays[length - 1];

  if (length > 2 && typeof iteratee == 'function') {
    length -= 2;
  } else {
    iteratee = (length > 1 && typeof thisArg == 'function') ? (--length, thisArg) : undefined;
    thisArg = undefined;
  }
  arrays.length = length;
  return unzipWith(arrays, iteratee, thisArg);
});

module.exports = zipWith;
