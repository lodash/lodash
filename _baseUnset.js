import baseHas from './_baseHas.js';
import castPath from './_castPath.js';
import isKey from './_isKey.js';
import last from './last.js';
import parent from './_parent.js';
import toKey from './_toKey.js';

/**
 * The base implementation of `_.unset`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 */
function baseUnset(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);
  object = parent(object, path);

  var key = toKey(last(path));
  return !(object != null && baseHas(object, key)) || delete object[key];
}

export default baseUnset;
