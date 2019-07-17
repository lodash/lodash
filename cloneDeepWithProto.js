import baseClone from './.internal/baseClone.js'
import isObject from './isObject.js'

/** Used to compose bitmasks for cloning. */
const CLONE_DEEP_FLAG = 1
const CLONE_SYMBOLS_FLAG = 4

/**
 * This method is like `clone` except that it recursively clones `value`. and __proto__
 * Object inheritance is preserved.
 *
 * @since 5.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value with __proto__.
 * @see clone
 * @example
 *
 * const objects = [{ 'a': 1 }, { 'b': 2 }]
 *
 * const deep = cloneDeepWithProto(objects)
 * console.log(deep[0] === objects[0])
 * // => false
 */
function cloneDeepWithProto(value) {
  return isObject(value) 
    ? Object.assign({}, value) 
    : baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG)
}

export default cloneDeepWithProto
