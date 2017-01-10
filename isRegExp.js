import baseIsRegExp from './_baseIsRegExp.js';
import nodeUtil from './_nodeUtil.js';

/* Node.js helper references. */
const nodeIsRegExp = nodeUtil && nodeUtil.isRegExp;

/**
 * Checks if `value` is classified as a `RegExp` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
 * @example
 *
 * _.isRegExp(/abc/);
 * // => true
 *
 * _.isRegExp('/abc/');
 * // => false
 */
const isRegExp = nodeIsRegExp
  ? value => nodeIsRegExp(value)
  : baseIsRegExp;

export default isRegExp;
