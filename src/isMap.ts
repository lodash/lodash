import getTag from './.internal/getTag.js';
import isObjectLike from './isObjectLike.js';
import nodeTypes from './.internal/nodeTypes.js';

/* Node.js helper references. */
const nodeIsMap = nodeTypes && nodeTypes.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * isMap(new Map)
 * // => true
 *
 * isMap(new WeakMap)
 * // => false
 */
const isMap = nodeIsMap
    ? (value) => nodeIsMap(value)
    : (value) => isObjectLike(value) && getTag(value) === '[object Map]';

export default isMap;
