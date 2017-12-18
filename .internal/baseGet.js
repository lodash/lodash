import castPath from './castPath.js'
import toKey from './toKey.js'

/**
 * The base implementation of `get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object)

  let index = 0
  const length = path.length

  while (object != null && index < length) {
    const key = toKey(path[index++])
    if (object instanceof Map) {
      object = object.get(key)
    } else {
      object = object[key]
    }
  }
  return (index && index == length) ? object : undefined
}

export default baseGet
