/**
 * Creates an array of function property names from own enumerable properties
 * of `object`.
 *
 * @since 0.1.0
 * @category Object
 * @example
 *   function Foo() {
 *     this.a = () => 'a'
 *     this.b = () => 'b'
 *   }
 *
 *   Foo.prototype.c = () => 'c'
 *
 *   functions(new Foo())
 *   // => ['a', 'b']
 *
 * @param {Object} object The object to inspect.
 * @see functionsIn
 * @returns {Array} Returns the function names.
 */
function functions(object) {
  if (object == null) {
    return []
  }
  return Object.keys(object).filter((key) => typeof object[key] === 'function')
}

export default functions
