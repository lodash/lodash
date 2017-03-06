/**
 * This method is like `forOwn` except that it iterates over properties of
 * `object` in the opposite order.
 *
 * @since 2.0.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 * @see forEach, forEachRight, forIn, forInRight, forOwn
 * @example
 *
 * function Foo() {
 *   this.a = 1
 *   this.b = 2
 * }
 *
 * Foo.prototype.c = 3
 *
 * forOwnRight(new Foo, function(value, key) {
 *   console.log(key)
 * })
 * // => Logs 'b' then 'a' assuming `forOwn` logs 'a' then 'b'.
 */
function forOwnRight(object, iteratee) {
  if (object == null) {
    return
  }
  const props = Object.keys(object)
  let length = props.length
  while (length--) {
    iteratee(object[props[length]], iteratee, object)
  }
}

export default forOwnRight
