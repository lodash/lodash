/**
 * Iterates over properties of `object`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, key, object).
 *
 * If you want an object in return, consider `pickBy`.
 *
 * @since 5.0.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 * @see pickBy, pull, pullAll, pullAllBy, pullAllWith, pullAt, remove, reject
 * @example
 *
 * const object = { 'a': 5, 'b': 8, 'c': 10 }
 *
 * filterObject(object, (n) => !(n % 5))
 * // => [5, 10]
 */
function filterObject(object, predicate) {
  object = Object(object)
  const result = []

  Object.keys(object).forEach((key) => {
    const value = object[key]
    if (predicate(value, key, object)) {
      result.push(value)
    }
  })
  return result
}

export default filterObject
