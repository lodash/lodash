/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseCallback = require('lodash._basecallback'),
    baseEach = require('lodash._baseeach'),
    isIterateeCall = require('lodash._isiterateecall'),
    toIterable = require('lodash._toiterable'),
    isArray = require('lodash.isarray'),
    isString = require('lodash.isstring');

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
 * Creates a function that gets the extremum value of a collection.
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
 * The `iteratee` is invoked with three arguments; (value, index, collection).
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
    if ((isMin ? current < computed : current > computed) || (current === exValue && current === result)) {
      computed = current;
      result = value;
    }
  });
  return result;
}

module.exports = createExtremum;
