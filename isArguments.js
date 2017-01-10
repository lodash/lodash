import baseGetTag from './_baseGetTag.js';
import isObjectLike from './isObjectLike.js';

/** `Object#toString` result references. */
const argsTag = '[object Arguments]';

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * isArguments(function() { return arguments; }());
 * // => true
 *
 * isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

export default isArguments;
