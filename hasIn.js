/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @since 4.0.0
 * @category Object
 * @example
 *   const object = create({ a: create({ b: 2 }) })
 *
 *   hasIn(object, 'a')
 *   // => true
 *
 *   hasIn(object, 'b')
 *   // => false
 *
 * @param {Object} object The object to query.
 * @param {string} key The key to check.
 * @see has, hasPath, hasPathIn
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function hasIn(object, key) {
  return object != null && key in Object(object)
}

export default hasIn
