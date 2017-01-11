import castPath from './castPath.js';
import isArguments from '../isArguments.js';
import isIndex from './isIndex.js';
import isLength from '../isLength.js';
import toKey from './toKey.js';

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  let key;
  let index = -1;
  let length = path.length;
  let result = false;

  while (++index < length) {
    key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (Array.isArray(object) || isArguments(object));
}

export default hasPath;
