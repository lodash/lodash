import arrayMap from './_arrayMap';
import isArray from './isArray';
import stringToPath from './_stringToPath';

/**
 * Converts `value` to a property path array.
 *
 * @static
 * @memberOf _
 * @category Util
 * @param {*} value The value to convert.
 * @returns {Array} Returns the new property path array.
 * @example
 *
 * _.toPath('a.b.c');
 * // => ['a', 'b', 'c']
 *
 * _.toPath('a[0].b.c');
 * // => ['a', '0', 'b', 'c']
 *
 * var path = ['a', 'b', 'c'],
 *     newPath = _.toPath(path);
 *
 * console.log(newPath);
 * // => ['a', 'b', 'c']
 *
 * console.log(path === newPath);
 * // => false
 */
function toPath(value) {
  return isArray(value) ? arrayMap(value, String) : stringToPath(value);
}

export default toPath;
