/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * @memberof _
 * @since 3.0.0
 * @category Object
 * @example
 *   function Foo() {
 *     this.a = 1
 *     this.b = 2
 *   }
 *
 *   Foo.prototype.c = 3
 *
 *   _.keysIn(new Foo())
 *   // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 *
 * @param {Object} object The object to query.
 * @static
 * @returns {Array} Returns the array of property names.
 */
function keysIn(object) {
  const result = []
  for (const key in object) {
    result.push(key)
  }
  return result
}

export default keysIn
