/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var isNative = require('lodash.isnative');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsFinite = global.isFinite,
    nativeNumIsFinite = isNative(nativeNumIsFinite = Number.isFinite) && nativeNumIsFinite;

/**
 * Checks if `value` is a finite primitive number.
 *
 * **Note:** This method is based on [`Number.isFinite`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isfinite).
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
 * @example
 *
 * _.isFinite(10);
 * // => true
 *
 * _.isFinite('10');
 * // => false
 *
 * _.isFinite(true);
 * // => false
 *
 * _.isFinite(Object(10));
 * // => false
 *
 * _.isFinite(Infinity);
 * // => false
 */
var isFinite = nativeNumIsFinite || function(value) {
  return typeof value == 'number' && nativeIsFinite(value);
};

module.exports = isFinite;
