import get from '../get.js'
import isNumber from '../isNumber'

/**
 * The base implementation of `at` without support for individual paths.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {string[]} paths The property paths to pick.
 * @returns {Array} Returns the picked elements.
 */
function baseAt(object, paths) {
  let index = -1
  const length = paths.length
  const objLength = object ? object.length : 0;
  const result = new Array(length)
  const skip = object == null

  while (++index < length) {
    if(isNumber(paths[index]) && paths[index] < 0){
      paths[index] += objLength
    }
    result[index] = skip ? undefined : get(object, paths[index])
  }
  return result
}

export default baseAt
