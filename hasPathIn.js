import castPath from './.internal/castPath.js'
import isArguments from './isArguments.js'
import isIndex from './.internal/isIndex.js'
import isLength from './isLength.js'
import toKey from './.internal/toKey.js'
import cloneDeep from './cloneDeep'
import hasIn from './hasIn.js'
import isNull from './isNull.js'
import isObject from './isObject.js'

/**
 * Checks if `path` is a direct property of `object`.
 *
 * @since 5.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @see has, hasIn hasPath
 * @example
 *
 * const object = { 'a': { 'b': 2 } }
 * const other = create({ 'a': create({ 'b': 2 }) })
 *
 * hasPathIn(object, 'a.b')
 * // => true
 *
 * hasPathIn(object, ['a', 'b'])
 * // => true
 */
function hasPathIn(object, path) {
  if (!isObject(object)) {
    throw new TypeError('Expected an object')
  }
  let copyObj = cloneDeep(object)
  path = castPath(path, copyObj)

  let index = -1
  let { length } = path
  let result = false
  let key

  while (++index < length) {
    key = toKey(path[index])
    if (!(result = hasIn(copyObj, key))) {
      break
    }
    copyObj = copyObj[key]
  }
  if (result || ++index !== length) {
    return result
  }
  length = isNull(copyObj) ? 0 : copyObj.length
  return !!length && isLength(length) && isIndex(key, length) &&
    (Array.isArray(copyObj) || isArguments(copyObj))
}

export default hasPathIn
