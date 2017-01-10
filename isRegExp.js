import baseIsRegExp from './.internal/baseIsRegExp.js';
import nodeUtil from './.internal/nodeUtil.js';

/* Node.js helper references. */
const nodeIsRegExp = nodeUtil && nodeUtil.isRegExp;

/**
 * Checks if `value` is classified as a `RegExp` object.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
 * @example
 *
 * isRegExp(/abc/);
 * // => true
 *
 * isRegExp('/abc/');
 * // => false
 */
const isRegExp = nodeIsRegExp
  ? value => nodeIsRegExp(value)
  : baseIsRegExp;

export default isRegExp;
