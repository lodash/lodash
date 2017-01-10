import baseFunctions from './_baseFunctions.js';
import keysIn from './keysIn.js';

/**
 * Creates an array of function property names from own and inherited
 * enumerable properties of `object`.
 *
 * @static
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the function names.
 * @see functions
 * @example
 *
 * function Foo() {
 *   this.a = constant('a');
 *   this.b = constant('b');
 * }
 *
 * Foo.prototype.c = constant('c');
 *
 * functionsIn(new Foo);
 * // => ['a', 'b', 'c']
 */
function functionsIn(object) {
  return object == null ? [] : baseFunctions(object, keysIn(object));
}

export default functionsIn;
