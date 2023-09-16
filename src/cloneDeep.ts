import baseClone from './.internal/baseClone.js';

/** Used to compose bitmasks for cloning. */
const CLONE_DEEP_FLAG = 1;
const CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `clone` except that it recursively clones `value`.
 * Object inheritance is preserved.
 *
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see clone
 * @example
 *
 * const objects = [{ 'a': 1 }, { 'b': 2 }]
 *
 * const deep = cloneDeep(objects)
 * console.log(deep[0] === objects[0])
 * // => false
 */
function cloneDeep(value) {
    return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

export default cloneDeep;
