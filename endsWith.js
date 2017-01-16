import baseClamp from './.internal/baseClamp.js';
import baseToString from './.internal/baseToString.js';
import toInteger from './toInteger.js';
import toString from './toString.js';

/**
 * Checks if `string` ends with the given target string.
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {string} [target] The string to search for.
 * @param {number} [position=string.length] The position to search up to.
 * @returns {boolean} Returns `true` if `string` ends with `target`,
 *  else `false`.
 * @see includes, startsWith
 * @example
 *
 * endsWith('abc', 'c');
 * // => true
 *
 * endsWith('abc', 'b');
 * // => false
 *
 * endsWith('abc', 'b', 2);
 * // => true
 */
function endsWith(string, target, position) {
  string = toString(string);
  target = baseToString(target);

  const length = string.length;
  position = position === undefined
    ? length
    : baseClamp(toInteger(position), 0, length);

  const end = position;
  position -= target.length;
  return position >= 0 && string.slice(position, end) == target;
}

export default endsWith;
