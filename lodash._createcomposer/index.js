/**
 * lodash 3.4.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function to compose other functions into a single function.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new composer function.
 */
function createComposer(fromRight) {
  return function() {
    var length = arguments.length,
        index = length,
        fromIndex = fromRight ? length - 1 : 0;

    if (!length) {
      return function() { return arguments[0]; };
    }
    var funcs = Array(length);
    while (index--) {
      funcs[index] = arguments[index];
      if (typeof funcs[index] != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
    }
    return function() {
      var index = fromIndex,
          result = funcs[index].apply(this, arguments);

      while ((fromRight ? index-- : ++index < length)) {
        result = funcs[index].call(this, result);
      }
      return result;
    };
  };
}

module.exports = createComposer;
