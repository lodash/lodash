import baseValues from './.internal/baseValues.js'
import keys from './keys.js'

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
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
 *   values(new Foo())
 *   // => [1, 2] (iteration order is not guaranteed)
 *
 *   values('hi')
 *   // => ['h', 'i']
 *
 * @param {Object} object The object to query.
 * @see keys, valuesIn
 * @returns {Array} Returns the array of property values.
 */
function values(object) {
  return object == null ? [] : baseValues(object, keys(object))
}

export default values
