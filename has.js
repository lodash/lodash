import baseHas from './.internal/baseHas.js';
import hasPath from './.internal/hasPath.js';

/**
 * Checks if `path` is a direct property of `object`.
 *
 * @since 0.1.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @see hasIn, set, get
 * @example
 *
 * const object = { 'a': { 'b': 2 } };
 * const other = create({ 'a': create({ 'b': 2 }) });
 *
 * has(object, 'a');
 * // => true
 *
 * has(object, 'a.b');
 * // => true
 *
 * has(object, ['a', 'b']);
 * // => true
 *
 * has(other, 'a');
 * // => false
 */
function has(object, path) {
  return object != null && hasPath(object, path, baseHas);
}

export default has;
