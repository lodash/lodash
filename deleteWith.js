/**
 * Delets the value at `path` of `object`.
 *
 * @since ^5.0.0
 * @category Function
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to delete.
 * @returns {boolean} Returns `boolean`.
 * @example
 *
 * const obj = {name: 1, jest: 2, nest: {name: 3, jest: 4}}
 *
 * deleteWith(obj, 'nest.name')
 *
 * // => {name: 1, jest: 2, nest: {jest: 4}}
 */
 
function deleteWith (object, path, index = 0) {
  const paths = Array.isArray(path) ? path : path.split('.')

  if (index + 1 >= paths.length) {
    return delete object[paths[index]]
  }

  return deleteWith(object[paths[index]], paths, ++index)
}

export default deleteWith
