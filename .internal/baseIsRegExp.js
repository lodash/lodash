import baseGetTag from './.internal/baseGetTag.js';
import isObjectLike from './isObjectLike.js';

/** `Object#toString` result references. */
const regexpTag = '[object RegExp]';

/**
 * The base implementation of `isRegExp` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
 */
function baseIsRegExp(value) {
  return isObjectLike(value) && baseGetTag(value) == regexpTag;
}

export default baseIsRegExp;
