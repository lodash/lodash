import basePickBy from './basePickBy.js'
import hasPathIn from '../hasPathIn.js'

/**
 * The base implementation of `pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, paths) {
  return basePickBy(object, paths, (value, path) => hasPathIn(object, path))
}

export default basePick
