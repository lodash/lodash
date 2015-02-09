var arrayEach = require('../internal/arrayEach'),
    baseCallback = require('../internal/baseCallback'),
    baseCreate = require('../internal/baseCreate'),
    baseForOwn = require('../internal/baseForOwn'),
    isArray = require('../lang/isArray'),
    isFunction = require('../lang/isFunction'),
    isObject = require('../lang/isObject'),
    isTypedArray = require('../lang/isTypedArray');

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
        accumulator = baseCreate(isFunction(Ctor) && Ctor.prototype);
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
