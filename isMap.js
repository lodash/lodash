import baseIsMap from './_baseIsMap.js';
import nodeUtil from './_nodeUtil.js';

/* Node.js helper references. */
const nodeIsMap = nodeUtil && nodeUtil.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
const isMap = nodeIsMap
  ? value => nodeIsMap(value)
  : baseIsMap;

export default isMap;
