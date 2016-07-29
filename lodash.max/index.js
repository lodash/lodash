/**
 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var arrayMax = require('lodash._arraymax'),
    baseCallback = require('lodash._basecallback'),
    baseEach = require('lodash._baseeach'),
    isIterateeCall = require('lodash._isiterateecall'),
    toIterable = require('lodash._toiterable'),
    isArray = require('lodash.isarray'),
    isString = require('lodash.isstring'),
    keys = require('lodash.keys');

/**
 * Used by `_.max` and `_.min` as the default callback for string values.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the code unit of the first character of the string.
 */
function charAtCallback(string) {
  return string.charCodeAt(0);
}

/** Used as references for `-Infinity` and `Infinity`. */
var NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY,
    POSITIVE_INFINITY = Number.POSITIVE_INFINITY;

/**
 * Creates a `_.max` or `_.min` function.
 *
 * @private
 * @param {Function} arrayFunc The function to get the extremum value from an array.
 * @param {boolean} [isMin] Specify returning the minimum, instead of the maximum,
 *  extremum value.
 * @returns {Function} Returns the new extremum function.
 */
function createExtremum(arrayFunc, isMin) {
  return function(collection, iteratee, thisArg) {
    if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
      iteratee = null;
    }
    var noIteratee = iteratee == null;

    iteratee = noIteratee ? iteratee : baseCallback(iteratee, thisArg, 3);
    if (noIteratee) {
      var isArr = isArray(collection);
      if (!isArr && isString(collection)) {
        iteratee = charAtCallback;
      } else {
        return arrayFunc(isArr ? collection : toIterable(collection));
      }
    }
    return extremumBy(collection, iteratee, isMin);
  };
}

/**
 * Gets the extremum value of `collection` invoking `iteratee` for each value
 * in `collection` to generate the criterion by which the value is ranked.
 * The `iteratee` is invoked with three arguments: (value, index, collection).
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {boolean} [isMin] Specify returning the minimum, instead of the
 *  maximum, extremum value.
 * @returns {*} Returns the extremum value.
 */
function extremumBy(collection, iteratee, isMin) {
  var exValue = isMin ? POSITIVE_INFINITY : NEGATIVE_INFINITY,
      computed = exValue,
      result = computed;

  baseEach(collection, function(value, index, collection) {
    var current = iteratee(value, index, collection);
    if ((isMin ? (current < computed) : (current > computed)) ||
        (current === exValue && current === result)) {
      computed = current;
      result = value;
    }
  });
  return result;
}

/**
 * Gets the maximum value of `collection`. If `collection` is empty or falsey
 * `-Infinity` is returned. If an iteratee function is provided it is invoked
 * for each value in `collection` to generate the criterion by which the value
 * is ranked. The `iteratee` is bound to `thisArg` and invoked with three
 * arguments: (value, index, collection).
 *
 * If a property name is provided for `iteratee` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `iteratee` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @category Math
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [iteratee] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {*} Returns the maximum value.
 * @example
 *
 * _.max([4, 2, 8, 6]);
 * // => 8
 *
 * _.max([]);
 * // => -Infinity
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 }
 * ];
 *
 * _.max(users, function(chr) {
 *   return chr.age;
 * });
 * // => { 'user': 'fred', 'age': 40 }
 *
 * // using the `_.property` callback shorthand
 * _.max(users, 'age');
 * // => { 'user': 'fred', 'age': 40 }
 */
var max = createExtremum(arrayMax);

module.exports = max;
