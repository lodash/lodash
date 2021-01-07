import arrayLikeKeys from './.internal/arrayLikeKeys.js'
import isArrayLike from './isArrayLike.js'

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the [ES
 * spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys) for more details.
 *
 * @since 0.1.0
 * @category Object
 * @example
 *   function Foo() {
 *     this.a = 1
 *     this.b = 2
 *   }
 *
 *   Foo.prototype.c = 3
 *
 *   keys(new Foo())
 *   // => ['a', 'b'] (iteration order is not guaranteed)
 *
 *   keys('hi')
 *   // => ['0', '1']
 *
 * @param {Object} object The object to query.
 * @see values, valuesIn
 * @returns {Array} Returns the array of property names.
 */
function keys(object) {
  return isArrayLike(object)
    ? arrayLikeKeys(object)
    : Object.keys(Object(object))
}

export default keys
