import baseToPath from './baseToPath';
import isArguments from '../isArguments';
import isArray from '../isArray';
import isIndex from './isIndex';
import isKey from './isKey';
import isLength from '../isLength';
import isString from '../isString';
import last from '../last';
import parent from './parent';

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
  if (object == null) {
    return false;
  }
  var result = hasFunc(object, path);
  if (!result && !isKey(path)) {
    path = baseToPath(path);
    object = parent(object, path);
    if (object != null) {
      path = last(path);
      result = hasFunc(object, path);
    }
  }
  return result || (isLength(object && object.length) && isIndex(path, object.length) &&
    (isArray(object) || isString(object) || isArguments(object)));
}

export default hasPath;
