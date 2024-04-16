import baseClone from './.internal/baseClone.js';

/** Used to compose bitmasks for cloning. */
const CLONE_DEEP_FLAG = 1;
const CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `clone` except that it recursively clones `value`.
 * Object inheritance is preserved. The method will attempt to use the native
 * [`structuredClone`](https://developer.mozilla.org/docs/Web/API/structuredClone)
 * function, if `value` [is supported](https://developer.mozilla.org/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#supported_types)
 * (and the native implementation is available). Otherwise it will fallback to a
 * custom implementation.
 *
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @param {boolean} [skipNativeCheck]
 *  Skip the native check and use the custom implementation. This is useful when
 *  `value` is known to be incompatible `structuredClone`.
 * @returns {*} Returns the deep cloned value.
 * @see clone
 * @example
 *
 * const objects = [{ 'a': 1 }, { 'b': 2 }]
 *
 * const deep = cloneDeep(objects)
 * console.log(deep[0] === objects[0])
 * // => false
 *
 * // The `skipNativeCheck` flag
 * const unsupportedNativeObject = { fn: () => 'a' };
 *
 * const deep = cloneDeep(unsupportedNativeObject, true);
 * console.log(deep === unsupportedNativeObject);
 * // => false
 */
function cloneDeep(value, skipNativeCheck) {
    try {
        if (!skipNativeCheck && structuredClone) {
            return structuredClone(value);
        }
        throw new Error('Unsupported structured clone');
    } catch {
        return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
    }
}

export default cloneDeep;
