/**
 * lodash 3.6.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseCallback = require('lodash._basecallback'),
    baseEach = require('lodash._baseeach'),
    isIterateeCall = require('lodash._isiterateecall'),
    toIterable = require('lodash._toiterable'),
    isArray = require('lodash.isarray'),
    keys = require('lodash.keys');

/**
 * A specialized version of `_.sum` for arrays without support for iteratees.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @returns {number} Returns the sum.
 */
function arraySum(array) {
  var length = array.length,
      result = 0;

  while (length--) {
    result += +array[length] || 0;
  }
  return result;
}

/**
 * The base implementation of `_.sum` without support for callback shorthands
 * and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {number} Returns the sum.
 */
function baseSum(collection, iteratee) {
  var result = 0;
  baseEach(collection, function(value, index, collection) {
    result += +iteratee(value, index, collection) || 0;
  });
  return result;
}

/**
 * Gets the sum of the values in `collection`.
 *
 * @static
 * @memberOf _
 * @category Math
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [iteratee] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {number} Returns the sum.
 * @example
 *
 * _.sum([4, 6]);
 * // => 10
 *
 * _.sum({ 'a': 4, 'b': 6 });
 * // => 10
 *
 * var objects = [
 *   { 'n': 4 },
 *   { 'n': 6 }
 * ];
 *
 * _.sum(objects, function(object) {
 *   return object.n;
 * });
 * // => 10
 *
 * // using the `_.property` callback shorthand
 * _.sum(objects, 'n');
 * // => 10
 */
function sum(collection, iteratee, thisArg) {
  if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
    iteratee = null;
  }
  var noIteratee = iteratee == null;

  iteratee = noIteratee ? iteratee : baseCallback(iteratee, thisArg, 3);
  return noIteratee
    ? arraySum(isArray(collection) ? collection : toIterable(collection))
    : baseSum(collection, iteratee);
}

module.exports = sum;
