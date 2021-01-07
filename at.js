import baseAt from './.internal/baseAt.js'
import baseFlatten from './.internal/baseFlatten.js'

/**
 * Creates an array of values corresponding to `paths` of `object`.
 *
 * @since 1.0.0
 * @category Object
 * @example
 *   const object = { a: [{ b: { c: 3 } }, 4] }
 *
 *   at(object, ['a[0].b.c', 'a[1]'])
 *   // => [3, 4]
 *
 * @param {Object} object The object to iterate over.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Array} Returns the picked values.
 */
const at = (object, ...paths) => baseAt(object, baseFlatten(paths, 1))

export default at
