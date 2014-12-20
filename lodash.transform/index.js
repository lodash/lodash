/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var arrayEach = require('lodash._arrayeach'),
    baseCallback = require('lodash._basecallback'),
    baseCreate = require('lodash._basecreate'),
    baseFor = require('lodash._basefor'),
    isArray = require('lodash.isarray'),
    isTypedArray = require('lodash.istypedarray'),
    keys = require('lodash.keys');

/**
 * The base implementation of `_.forOwn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return baseFor(object, iteratee, keys);
}

/**
 * Checks if `value` is the language type of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * **Note:** See the [ES5 spec](https://es5.github.io/#x8) for more details.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return type == 'function' || (value && type == 'object') || false;
}

/**
 * An alternative to `_.reduce`; this method transforms `object` to a new
 * `accumulator` object which is the result of running each of its own enumerable
 * properties through `iteratee`, with each invocation potentially mutating
 * the `accumulator` object. The `iteratee` is bound to `thisArg` and invoked
 * with four arguments; (accumulator, value, key, object). Iterator functions
 * may exit iteration early by explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Array|Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [accumulator] The custom accumulator value.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {*} Returns the accumulated value.
 * @example
 *
 * var squares = _.transform([1, 2, 3, 4, 5, 6], function(result, n) {
 *   n *= n;
 *   if (n % 2) {
 *     return result.push(n) < 3;
 *   }
 * });
 * // => [1, 9, 25]
 *
 * var mapped = _.transform({ 'a': 1, 'b': 2, 'c': 3 }, function(result, n, key) {
 *   result[key] = n * 3;
 * });
 * // => { 'a': 3, 'b': 6, 'c': 9 }
 */
function transform(object, iteratee, accumulator, thisArg) {
  var isArr = isArray(object) || isTypedArray(object);
  iteratee = baseCallback(iteratee, thisArg, 4);

  if (accumulator == null) {
    if (isArr || isObject(object)) {
      var Ctor = object.constructor;
      if (isArr) {
        accumulator = isArray(object) ? new Ctor : [];
      } else {
        accumulator = baseCreate(typeof Ctor == 'function' && Ctor.prototype);
      }
    } else {
      accumulator = {};
    }
  }
  (isArr ? arrayEach : baseForOwn)(object, function(value, index, object) {
    return iteratee(accumulator, value, index, object);
  });
  return accumulator;
}

module.exports = transform;
