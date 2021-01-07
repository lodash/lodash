import baseUnset from './.internal/baseUnset.js'

/**
 * Removes the property at `path` of `object`.
 *
 * **Note:** This method mutates `object`.
 *
 * @since 4.0.0
 * @category Object
 * @example
 *   const object = { a: [{ b: { c: 7 } }] }
 *   unset(object, 'a[0].b.c')
 *   // => true
 *
 *   console.log(object)
 *   // => { 'a': [{ 'b': {} }] }
 *
 *   unset(object, ['a', '0', 'b', 'c'])
 *   // => true
 *
 *   console.log(object)
 *   // => { 'a': [{ 'b': {} }] }
 *
 * @param {Object} object The object to modify.
 * @param {Array | string} path The path of the property to unset.
 * @see get, has, set
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 */
function unset(object, path) {
  return object == null ? true : baseUnset(object, path)
}

export default unset
