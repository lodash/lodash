/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var createWrapper = require('lodash._createwrapper'),
    isIterateeCall = require('lodash._isiterateecall');

/** Used to compose bitmasks for wrapper metadata. */
var ARY_FLAG = 128;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that accepts up to `n` arguments ignoring any
 * additional arguments.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to cap arguments for.
 * @param {number} [n=func.length] The arity cap.
 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
 * @returns {Function} Returns the new function.
 * @example
 *
 * _.map(['6', '8', '10'], _.ary(parseInt, 1));
 * // => [6, 8, 10]
 */
function ary(func, n, guard) {
  if (guard && isIterateeCall(func, n, guard)) {
    n = undefined;
  }
  n = (func && n == null) ? func.length : nativeMax(+n || 0, 0);
  return createWrapper(func, ARY_FLAG, undefined, undefined, undefined, undefined, n);
}

module.exports = ary;
