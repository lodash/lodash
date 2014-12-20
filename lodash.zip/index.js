/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var unzip = require('lodash.unzip');

/**
 * Creates an array of grouped elements, the first of which contains the first
 * elements of the given arrays, the second of which contains the second elements
 * of the given arrays, and so on.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {...Array} [arrays] The arrays to process.
 * @returns {Array} Returns the new array of grouped elements.
 * @example
 *
 * _.zip(['fred', 'barney'], [30, 40], [true, false]);
 * // => [['fred', 30, true], ['barney', 40, false]]
 */
function zip() {
  var length = arguments.length,
      array = Array(length);

  while (length--) {
    array[length] = arguments[length];
  }
  return unzip(array);
}

module.exports = zip;
