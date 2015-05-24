/**
 * lodash 3.4.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Adds two numbers.
 *
 * @static
 * @memberOf _
 * @category Math
 * @param {number} augend The first number in an addition.
 * @param {number} addend The second number in an addition.
 * @returns {number} Returns the total.
 * @example
 *
 * _.add(6, 4);
 * // => 10
 */
function add(augend, addend) {
  var result;
  if (augend === undefined && addend === undefined) {
    return 0;
  }
  if (augend !== undefined) {
    result = augend;
  }
  if (addend !== undefined) {
    result = result === undefined ? addend : (result + addend);
  }
  return result;
}

module.exports = add;
