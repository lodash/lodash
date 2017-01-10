import baseInvoke from './.internal/baseInvoke.js';

/**
 * Invokes the method at `path` of `object`.
 *
 * @static
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the method to invoke.
 * @param {...*} [args] The arguments to invoke the method with.
 * @returns {*} Returns the result of the invoked method.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] };
 *
 * invoke(object, 'a[0].b.c.slice', 1, 3);
 * // => [2, 3]
 */
function invoke(object, path, ...args) {
  return baseInvoke(object, path, args);
}

export default invoke;
