/**
 * lodash 3.7.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var invokePath = require('lodash._invokepath'),
    restParam = require('lodash.restparam');

/**
 * Creates a function that invokes the method at `path` on a given object.
 * Any additional arguments are provided to the invoked method.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {Array|string} path The path of the method to invoke.
 * @param {...*} [args] The arguments to invoke the method with.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': { 'c': _.constant(2) } } },
 *   { 'a': { 'b': { 'c': _.constant(1) } } }
 * ];
 *
 * _.map(objects, _.method('a.b.c'));
 * // => [2, 1]
 *
 * _.invoke(_.sortBy(objects, _.method(['a', 'b', 'c'])), 'a.b.c');
 * // => [1, 2]
 */
var method = restParam(function(path, args) {
  return function(object) {
    return invokePath(object, path, args);
  };
});

module.exports = method;
