/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseDifference = require('lodash._basedifference'),
    baseUniq = require('lodash._baseuniq'),
    isArguments = require('lodash.isarguments'),
    isArray = require('lodash.isarray');

/**
 * Creates an array that is the [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
 * of the provided arrays.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of values.
 * @example
 *
 * _.xor([1, 2], [4, 2]);
 * // => [1, 4]
 */
function xor() {
  var index = -1,
      length = arguments.length;

  while (++index < length) {
    var array = arguments[index];
    if (isArray(array) || isArguments(array)) {
      var result = result
        ? baseDifference(result, array).concat(baseDifference(array, result))
        : array;
    }
  }
  return result ? baseUniq(result) : [];
}

module.exports = xor;
