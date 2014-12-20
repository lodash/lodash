/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used as references for `-Infinity` and `Infinity`. */
var POSITIVE_INFINITY = Number.POSITIVE_INFINITY;

/**
 * A specialized version of `_.min` for arrays without support for iteratees.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @returns {*} Returns the minimum value.
 */
function arrayMin(array) {
  var index = -1,
      length = array.length,
      result = POSITIVE_INFINITY;

  while (++index < length) {
    var value = array[index];
    if (value < result) {
      result = value;
    }
  }
  return result;
}

module.exports = arrayMin;
