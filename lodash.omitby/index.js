/**
 * lodash 4.2.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseFor = require('lodash._basefor'),
    baseIteratee = require('lodash._baseiteratee'),
    keysIn = require('lodash.keysin');

/**
 * The base implementation of `_.forIn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForIn(object, iteratee) {
  return object == null ? object : baseFor(object, iteratee, keysIn);
}

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, predicate) {
  var result = {};
  baseForIn(object, function(value, key) {
    if (predicate(value, key)) {
      result[key] = value;
    }
  });
  return result;
}

/**
 * The opposite of `_.pickBy`; this method creates an object composed of the
 * own and inherited enumerable properties of `object` that `predicate`
 * doesn't return truthy for.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked per property.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omitBy(object, _.isNumber);
 * // => { 'b': '2' }
 */
function omitBy(object, predicate) {
  predicate = baseIteratee(predicate, 2);
  return basePickBy(object, function(value, key) {
    return !predicate(value, key);
  });
}

module.exports = omitBy;
