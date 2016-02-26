/**
 * lodash 4.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseFlatten = require('lodash._baseflatten'),
    get = require('lodash.get'),
    rest = require('lodash.rest');

/**
 * The base implementation of `_.at` without support for individual paths.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {string[]} paths The property paths of elements to pick.
 * @returns {Array} Returns the new array of picked elements.
 */
function baseAt(object, paths) {
  var index = -1,
      isNil = object == null,
      length = paths.length,
      result = Array(length);

  while (++index < length) {
    result[index] = isNil ? undefined : get(object, paths[index]);
  }
  return result;
}

/**
 * Creates an array of values corresponding to `paths` of `object`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {...(string|string[])} [paths] The property paths of elements to pick,
 *  specified individually or in arrays.
 * @returns {Array} Returns the new array of picked elements.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
 *
 * _.at(object, ['a[0].b.c', 'a[1]']);
 * // => [3, 4]
 *
 * _.at(['a', 'b', 'c'], 0, 2);
 * // => ['a', 'c']
 */
var at = rest(function(object, paths) {
  return baseAt(object, baseFlatten(paths));
});

module.exports = at;
