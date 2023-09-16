import customDefaultsMerge from './.internal/customDefaultsMerge.js';
import mergeWith from './mergeWith.js';

/**
 * This method is like `defaults` except that it recursively assigns
 * default properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @since 3.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see defaults
 * @example
 *
 * defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } })
 * // => { 'a': { 'b': 2, 'c': 3 } }
 */
function defaultsDeep(...args) {
    args.push(undefined, customDefaultsMerge);
    return mergeWith.apply(undefined, args);
}

export default defaultsDeep;
