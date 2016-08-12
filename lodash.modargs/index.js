/**
 * lodash 3.10.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var arrayEvery = require('lodash._arrayevery'),
    baseFlatten = require('lodash._baseflatten'),
    restParam = require('lodash.restparam');

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * The base implementation of `_.isFunction` without support for environments
 * with incorrect `typeof` results.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 */
function baseIsFunction(value) {
  // Avoid a Chakra JIT bug in compatibility modes of IE 11.
  // See https://github.com/jashkenas/underscore/issues/1621 for more details.
  return typeof value == 'function' || false;
}

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * Creates a function that runs each argument through a corresponding
 * transform function.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to wrap.
 * @param {...(Function|Function[])} [transforms] The functions to transform
 * arguments, specified as individual functions or arrays of functions.
 * @returns {Function} Returns the new function.
 * @example
 *
 * function doubled(n) {
 *   return n * 2;
 * }
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * var modded = _.modArgs(function(x, y) {
 *   return [x, y];
 * }, square, doubled);
 *
 * modded(1, 2);
 * // => [1, 4]
 *
 * modded(5, 10);
 * // => [25, 20]
 */
var modArgs = restParam(function(func, transforms) {
  transforms = baseFlatten(transforms);
  if (typeof func != 'function' || !arrayEvery(transforms, baseIsFunction)) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var length = transforms.length;
  return restParam(function(args) {
    var index = nativeMin(args.length, length);
    while (index--) {
      args[index] = transforms[index](args[index]);
    }
    return func.apply(this, args);
  });
});

module.exports = modArgs;
