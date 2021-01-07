/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * Checks if `key` is a direct property of `object`.
 *
 * @since 0.1.0
 * @category Object
 * @example
 *   const object = { a: { b: 2 } }
 *   const other = create({ a: create({ b: 2 }) })
 *
 *   has(object, 'a')
 *   // => true
 *
 *   has(other, 'a')
 *   // => false
 *
 * @param {Object} object The object to query.
 * @param {string} key The key to check.
 * @see hasIn, hasPath, hasPathIn
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function has(object, key) {
  return object != null && hasOwnProperty.call(object, key)
}

export default has
