import invoke from './invoke.js';

/**
 * Creates a function that invokes the method at `path` of a given object.
 * Any additional arguments are provided to the invoked method.
 *
 * @since 3.7.0
 * @category Util
 * @param {Array|string} path The path of the method to invoke.
 * @param {Array} [args] The arguments to invoke the method with.
 * @returns {Function} Returns the new invoker function.
 * @example
 *
 * const objects = [
 *   { 'a': { 'b': () => 2 } },
 *   { 'a': { 'b': () => 1 } }
 * ]
 *
 * map(objects, method('a.b'))
 * // => [2, 1]
 *
 * map(objects, method(['a', 'b']))
 * // => [2, 1]
 */
function method(path, args) {
    return (object) => invoke(object, path, args);
}

export default method;
