import baseIsArguments from './_baseIsArguments.js';
import isObjectLike from './isObjectLike.js';

/** Used for built-in method references. */
const objectProto = Object.prototype;

/** Used to check objects for own properties. */
const hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
const propertyIsEnumerable = objectProto.propertyIsEnumerable;

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
const isArguments = baseIsArguments(function(...args) { return args; }()) ? baseIsArguments : value => isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
  !propertyIsEnumerable.call(value, 'callee');

export default isArguments;
