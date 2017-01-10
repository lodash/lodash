import baseInvoke from './_baseInvoke.js';

/**
 * The opposite of `method`; this method creates a function that invokes
 * the method at a given path of `object`. Any additional arguments are
 * provided to the invoked method.
 *
 * @static
 * @since 3.7.0
 * @category Util
 * @param {Object} object The object to query.
 * @param {...*} [args] The arguments to invoke the method with.
 * @returns {Function} Returns the new invoker function.
 * @example
 *
 * var array = times(3, constant),
 *     object = { 'a': array, 'b': array, 'c': array };
 *
 * map(['a[2]', 'c[0]'], methodOf(object));
 * // => [2, 0]
 *
 * map([['a', '2'], ['c', '0']], methodOf(object));
 * // => [2, 0]
 */
function methodOf(object, ...args) {
  return path => baseInvoke(object, path, args);
}

export default methodOf;
