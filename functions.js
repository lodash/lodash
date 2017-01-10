import baseFunctions from './.internal/baseFunctions.js';
import keys from './keys.js';

/**
 * Creates an array of function property names from own enumerable properties
 * of `object`.
 *
 * @since 0.1.0
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the function names.
 * @see functionsIn
 * @example
 *
 * function Foo() {
 *   this.a = constant('a');
 *   this.b = constant('b');
 * }
 *
 * Foo.prototype.c = constant('c');
 *
 * functions(new Foo);
 * // => ['a', 'b']
 */
function functions(object) {
  return object == null ? [] : baseFunctions(object, keys(object));
}

export default functions;
