import baseClone from './.internal/baseClone.js';

/** Used to compose bitmasks for cloning. */
const CLONE_DEEP_FLAG = 1;
const CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `cloneWith` except that it recursively clones `value`.
 * The customizer is invoked with up to four arguments
 * (value [, index|key, object, stack]).
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @param {Function} [customizer] The function to customize cloning.
 * @returns {*} Returns the deep cloned value.
 * @see cloneWith
 * @example
 *
 * function customizer(value) {
 *   if (isElement(value)) {
 *     return value.cloneNode(true)
 *   }
 * }
 *
 * const el = cloneDeepWith(document.body, customizer)
 *
 * console.log(el === document.body)
 * // => false
 * console.log(el.nodeName)
 * // => 'BODY'
 * console.log(el.childNodes.length)
 * // => 20
 */
function cloneDeepWith(value, customizer) {
    customizer = typeof customizer === 'function' ? customizer : undefined;
    return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
}

export default cloneDeepWith;
