import baseClamp from './.internal/baseClamp.js';
import baseToString from './.internal/baseToString.js';
import toInteger from './toInteger.js';
import toString from './toString.js';

/**
 * Checks if `string` starts with the given target string.
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {string} [target] The string to search for.
 * @param {number} [position=0] The position to search from.
 * @returns {boolean} Returns `true` if `string` starts with `target`,
 *  else `false`.
 * @see endsWith, includes
 * @example
 *
 * startsWith('abc', 'a');
 * // => true
 *
 * startsWith('abc', 'b');
 * // => false
 *
 * startsWith('abc', 'b', 1);
 * // => true
 */
function startsWith(string, target, position) {
  string = toString(string);
  position = position == null
    ? 0
    : baseClamp(toInteger(position), 0, string.length);

  target = baseToString(target);
  return string.slice(position, position + target.length) == target;
}

export default startsWith;
