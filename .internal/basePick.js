import basePickBy from './basePickBy.js'
import hasIn from '../hasIn.js'

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
  return basePickBy(object, paths, (value, path) => hasIn(object, path))
}

export default basePick
