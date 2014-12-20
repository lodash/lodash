/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var isError = require('lodash.iserror');

/**
 * Attempts to invoke `func`, returning either the result or the caught
 * error object.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} func The function to attempt.
 * @returns {*} Returns the `func` result or error object.
 * @example
 *
 * // avoid throwing errors for invalid selectors
 * var elements = _.attempt(function() {
 *   return document.querySelectorAll(selector);
 * });
 *
 * if (_.isError(elements)) {
 *   elements = [];
 * }
 */
function attempt(func) {
  try {
    return func();
  } catch(e) {
    return isError(e) ? e : Error(e);
  }
}

module.exports = attempt;
