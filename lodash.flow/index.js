/**
 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var createComposer = require('lodash._createcomposer');

/**
 * Creates a function that returns the result of invoking the provided
 * functions with the `this` binding of the created function, where each
 * successive invocation is supplied the return value of the previous.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {...Function} [funcs] Functions to invoke.
 * @returns {Function} Returns the new function.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * var addSquare = _.flow(_.add, square);
 * addSquare(1, 2);
 * // => 9
 */
var flow = createComposer();

module.exports = flow;
