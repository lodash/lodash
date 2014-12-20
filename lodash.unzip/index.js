/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var arrayMap = require('lodash._arraymap'),
    arrayMax = require('lodash._arraymax'),
    baseProperty = require('lodash._baseproperty');

/** Used to the length of n-tuples for `_.unzip`. */
var getLength = baseProperty('length');

/**
 * This method is like `_.zip` except that it accepts an array of grouped
 * elements and creates an array regrouping the elements to their pre-`_.zip`
 * configuration.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array of grouped elements to process.
 * @returns {Array} Returns the new array of regrouped elements.
 * @example
 *
 * var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
 * // => [['fred', 30, true], ['barney', 40, false]]
 *
 * _.unzip(zipped);
 * // => [['fred', 'barney'], [30, 40], [true, false]]
 */
function unzip(array) {
  var index = -1,
      length = (array && array.length && arrayMax(arrayMap(array, getLength))) >>> 0,
      result = Array(length);

  while (++index < length) {
    result[index] = arrayMap(array, baseProperty(index));
  }
  return result;
}

module.exports = unzip;
