import baseClone from './.internal/baseClone.js'

/** Used to compose bitmasks for cloning. */
const CLONE_SYMBOLS_FLAG = 4

/**
 * Creates a shallow clone of `value`.
 *
 * **Note:** This method is loosely based on the [structured clone
 * algorithm](https://mdn.io/Structured_clone_algorithm) and supports cloning
 * arrays, array buffers, booleans, date objects, maps, numbers, `Object`
 * objects, regexes, sets, strings, symbols, and typed arrays. The own
 * enumerable properties of `arguments` objects are cloned as plain objects.
 * Object inheritance is preserved. An empty object is returned for uncloneable
 * values such as error objects, functions, DOM nodes, and WeakMaps.
 *
 * @since 0.1.0
 * @category Lang
 * @example
 *   const objects = [{ a: 1 }, { b: 2 }]
 *
 *   const shallow = clone(objects)
 *   console.log(shallow[0] === objects[0])
 *   // => true
 *
 * @param {any} value The value to clone.
 * @see cloneDeep
 * @returns {any} Returns the cloned value.
 */
function clone(value) {
  return baseClone(value, CLONE_SYMBOLS_FLAG)
}

export default clone
