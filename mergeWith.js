import baseMerge from './.internal/baseMerge.js'
import createAssigner from './.internal/createAssigner.js'

/**
 * This method is like `merge` except that it accepts `customizer` which
 * is invoked to produce the merged values of the destination and source
 * properties. If `customizer` returns `undefined`, merging is handled by the
 * method instead. The `customizer` is invoked with six arguments:
 * (objValue, srcValue, key, object, source, stack).
 *
 * **Note:** This method mutates `object`.
 *
 * @since 4.0.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} customizer The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   if (Array.isArray(objValue)) {
 *     return objValue.concat(srcValue)
 *   }
 * }
 *
 * const object = { 'a': [1], 'b': [2] }
 * const other = { 'a': [3], 'b': [4] }
 *
 * mergeWith(object, other, customizer)
 * // => { 'a': [1, 3], 'b': [2, 4] }
 */
const mergeWith = createAssigner((object, source, srcIndex, customizer) => {
  baseMerge(object, source, srcIndex, customizer)
})

export default mergeWith
