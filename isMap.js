import baseIsMap from './.internal/baseIsMap.js';
import nodeUtil from './.internal/nodeUtil.js';

/* Node.js helper references. */
const nodeIsMap = nodeUtil && nodeUtil.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * isMap(new Map);
 * // => true
 *
 * isMap(new WeakMap);
 * // => false
 */
const isMap = nodeIsMap
  ? value => nodeIsMap(value)
  : baseIsMap;

export default isMap;
