/**
 * lodash 4.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseFlatten = require('lodash._baseflatten'),
    rest = require('lodash.rest');

/**
 * Creates a new array concatenating `array` with `other`.
 *
 * @private
 * @param {Array} array The first array to concatenate.
 * @param {Array} other The second array to concatenate.
 * @returns {Array} Returns the new concatenated array.
 */
function arrayConcat(array, other) {
  var index = -1,
      length = array.length,
      othIndex = -1,
      othLength = other.length,
      result = Array(length + othLength);

  while (++index < length) {
    result[index] = array[index];
  }
  while (++othIndex < othLength) {
    result[index++] = other[othIndex];
  }
  return result;
}

/**
 * Creates a new array concatenating `array` with any additional arrays
 * and/or values.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to concatenate.
 * @param {...*} [values] The values to concatenate.
 * @returns {Array} Returns the new concatenated array.
 * @example
 *
 * var array = [1];
 * var other = _.concat(array, 2, [3], [[4]]);
 *
 * console.log(other);
 * // => [1, 2, 3, [4]]
 *
 * console.log(array);
 * // => [1]
 */
var concat = rest(function(array, values) {
  if (!isArray(array)) {
    array = array == null ? [] : [Object(array)];
  }
  values = baseFlatten(values);
  return arrayConcat(array, values);
});

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = concat;
