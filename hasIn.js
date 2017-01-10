import baseHasIn from './_baseHasIn.js';
import hasPath from './_hasPath.js';

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = create({ 'a': create({ 'b': 2 }) });
 *
 * hasIn(object, 'a');
 * // => true
 *
 * hasIn(object, 'a.b');
 * // => true
 *
 * hasIn(object, ['a', 'b']);
 * // => true
 *
 * hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

export default hasIn;
