import isFunction from './isFunction.js';
import isObject from './isObject.js';
import toSource from './.internal/toSource.js';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
const reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
const reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect if a method is native. */
const reIsNative = RegExp(`^${
  Function.prototype.toString.call(Object.prototype.hasOwnProperty)
    .replace(reRegExpChar, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?')
}$`);

/**
 * Checks if `value` is a pristine native function.
 *
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 * @example
 *
 * isNative(Array.prototype.push);
 * // => true
 *
 * isNative(isDate);
 * // => false
 */
function isNative(value) {
  if (!isObject(value)) {
    return false;
  }
  const pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

export default isNative;
