import getTag from './.internal/getTag.js';
import isObjectLike from './isObjectLike.js';

/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
 * @example
 *
 * isBoolean(false)
 * // => true
 *
 * isBoolean(null)
 * // => false
 */
function isBoolean(value) {
    return (
        value === true ||
        value === false ||
        (isObjectLike(value) && getTag(value) === '[object Boolean]')
    );
}

export default isBoolean;
