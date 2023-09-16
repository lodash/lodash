import isObjectLike from './isObjectLike.js';
import isPlainObject from './isPlainObject.js';

/**
 * Checks if `value` is likely a DOM element.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
 * @example
 *
 * isElement(document.body)
 * // => true
 *
 * isElement('<body>')
 * // => false
 */
function isElement(value) {
    return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
}

export default isElement;
