import baseMerge from './.internal/baseMerge.js';
import createAssigner from './.internal/createAssigner.js';

/**
 * This method is like `assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 * If multiple sources are to be used and they are not intended to be mutated, use in conjunction with `_.clone` or `_.cloneDeep` on source objects.
 *
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * const object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * }
 *
 * const other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * }
 *
 * merge(object, other)
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
const merge = createAssigner((object, source, srcIndex) => {
    baseMerge(object, source, srcIndex);
});

export default merge;
