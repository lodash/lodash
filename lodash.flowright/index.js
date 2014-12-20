/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var arrayEvery = require('lodash._arrayevery'),
    isFunction = require('lodash.isfunction');

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * This method is like `_.flow` except that it creates a function that
 * invokes the provided functions from right to left.
 *
 * @static
 * @memberOf _
 * @alias backflow, compose
 * @category Function
 * @param {...Function} [funcs] Functions to invoke.
 * @returns {Function} Returns the new function.
 * @example
 *
 * function add(x, y) {
 *   return x + y;
 * }
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * var addSquare = _.flowRight(square, add);
 * addSquare(1, 2);
 * // => 9
 */
function flowRight() {
  var funcs = arguments,
      fromIndex = funcs.length - 1;

  if (fromIndex < 0) {
    return function() {};
  }
  if (!arrayEvery(funcs, isFunction)) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  return function() {
    var index = fromIndex,
        result = funcs[index].apply(this, arguments);

    while (index--) {
      result = funcs[index].call(this, result);
    }
    return result;
  };
}

module.exports = flowRight;
