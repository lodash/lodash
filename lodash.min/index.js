/**
 * lodash 3.3.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseCallback = require('lodash._basecallback'),
    baseEach = require('lodash._baseeach'),
    isIterateeCall = require('lodash._isiterateecall'),
    toIterable = require('lodash._toiterable'),
    keys = require('lodash.keys'),
    lt = require('lodash.lt');

/**
 * A specialized version of `baseExtremum` for arrays whichs invokes `iteratee`
 * with one argument: (value).
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} comparator The function used to compare values.
 * @param {*} exValue The initial extremum value.
 * @returns {*} Returns the extremum value.
 */
function arrayExtremum(array, iteratee, comparator, exValue) {
  var index = -1,
      length = array.length,
      computed = exValue,
      result = computed;

  while (++index < length) {
    var value = array[index],
        current = +iteratee(value);

    if (comparator(current, computed)) {
      computed = current;
      result = value;
    }
  }
  return result;
}

/**
 * Gets the extremum value of `collection` invoking `iteratee` for each value
 * in `collection` to generate the criterion by which the value is ranked.
 * The `iteratee` is invoked with three arguments: (value, index|key, collection).
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} comparator The function used to compare values.
 * @param {*} exValue The initial extremum value.
 * @returns {*} Returns the extremum value.
 */
function baseExtremum(collection, iteratee, comparator, exValue) {
  var computed = exValue,
      result = computed;

  baseEach(collection, function(value, index, collection) {
    var current = +iteratee(value, index, collection);
    if (comparator(current, computed) || (current === exValue && current === result)) {
      computed = current;
      result = value;
    }
  });
  return result;
}

/**
 * Creates a `_.max` or `_.min` function.
 *
 * @private
 * @param {Function} comparator The function used to compare values.
 * @param {*} exValue The initial extremum value.
 * @returns {Function} Returns the new extremum function.
 */
function createExtremum(comparator, exValue) {
  return function(collection, iteratee, thisArg) {
    if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
      iteratee = null;
    }
    iteratee = baseCallback(iteratee, thisArg, 3);
    if (iteratee.length == 1) {
      collection = toIterable(collection);
      var result = arrayExtremum(collection, iteratee, comparator, exValue);
      if (!(collection.length && result === exValue)) {
        return result;
      }
    }
    return baseExtremum(collection, iteratee, comparator, exValue);
  };
}

/**
 * Gets the minimum value of `collection`. If `collection` is empty or falsey
 * `Infinity` is returned. If an iteratee function is provided it is invoked
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
 * @returns {*} Returns the minimum value.
 * @example
 *
 * _.min([4, 2, 8, 6]);
 * // => 2
 *
 * _.min([]);
 * // => Infinity
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 }
 * ];
 *
 * _.min(users, function(chr) {
 *   return chr.age;
 * });
 * // => { 'user': 'barney', 'age': 36 }
 *
 * // using the `_.property` callback shorthand
 * _.min(users, 'age');
 * // => { 'user': 'barney', 'age': 36 }
 */
var min = createExtremum(lt, Infinity);

module.exports = min;
