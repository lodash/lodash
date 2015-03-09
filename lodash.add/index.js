/**
 * lodash 3.4.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Adds two numbers.
 *
 * @static
 * @memberOf _
 * @category Math
 * @param {number} augend The first number to add.
 * @param {number} addend The second number to add.
 * @returns {number} Returns the sum.
 * @example
 *
 * _.add(6, 4);
 * // => 10
 */
function add(augend, addend) {
  return (+augend || 0) + (+addend || 0);
}

module.exports = add;
