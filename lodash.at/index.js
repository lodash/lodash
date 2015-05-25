/**
 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseAt = require('lodash._baseat'),
    baseFlatten = require('lodash._baseflatten'),
    toIterable = require('lodash._toiterable'),
    restParam = require('lodash.restparam');

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Creates an array of elements corresponding to the given keys, or indexes,
 * of `collection`. Keys may be specified as individual arguments or as arrays
 * of keys.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {...(number|number[]|string|string[])} [props] The property names
 *  or indexes of elements to pick, specified individually or in arrays.
 * @returns {Array} Returns the new array of picked elements.
 * @example
 *
 * _.at(['a', 'b', 'c'], [0, 2]);
 * // => ['a', 'c']
 *
 * _.at(['barney', 'fred', 'pebbles'], 0, 2);
 * // => ['barney', 'pebbles']
 */
var at = restParam(function(collection, props) {
  var length = collection ? collection.length : 0;
  if (isLength(length)) {
    collection = toIterable(collection);
  }
  return baseAt(collection, baseFlatten(props));
});

module.exports = at;
