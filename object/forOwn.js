var baseForOwn = require('../internal/baseForOwn'),
    bindCallback = require('../internal/bindCallback');

/**
 * Iterates over own enumerable properties of an object invoking `iteratee`
 * for each property. The `iteratee` is bound to `thisArg` and invoked with
 * three arguments; (value, key, object). Iterator functions may exit iteration
 * early by explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * _.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(n, key) {
 *   console.log(key);
 * });
 * // => logs '0', '1', and 'length' (iteration order is not guaranteed)
 */
function forOwn(object, iteratee, thisArg) {
  if (typeof iteratee != 'function' || typeof thisArg != 'undefined') {
    iteratee = bindCallback(iteratee, thisArg, 3);
  }
  return baseForOwn(object, iteratee);
}

module.exports = forOwn;
