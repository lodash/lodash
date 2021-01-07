import baseSet from './.internal/baseSet.js'
import baseZipObject from './.internal/baseZipObject.js'

/**
 * This method is like `zipObject` except that it supports property paths.
 *
 * @since 4.1.0
 * @category Array
 * @example
 *   zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2])
 *   // => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
 *
 * @param {Array} [props] The property identifiers. Default is `[]`
 * @param {Array} [values] The property values. Default is `[]`
 * @see unzip, unzipWith, zip, zipObject, zipWith
 * @returns {Object} Returns the new object.
 */
function zipObjectDeep(props, values) {
  return baseZipObject(props || [], values || [], baseSet)
}

export default zipObjectDeep
