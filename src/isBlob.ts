import root from './.internal/root.js';
import getTag from './.internal/getTag.js';

/**
 * Checks if `value` is classified as a `Blob` primitive or object.
 *
 * @since 5.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a blob, else `false`.
 * @example
 *
 * isBlob(new Blob(['1', '2', '3']))
 * // => true
 *
 * isBlob(['1', '2', '3'])
 * // => false
 *
 */
function isBlob(value) {
    if (typeof root.Blob === 'undefined') {
        return false;
    }

    return value instanceof Blob && getTag(value) === '[object Blob]';
}

export default isBlob;
