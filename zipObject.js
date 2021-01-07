import assignValue from './.internal/assignValue.js'
import baseZipObject from './.internal/baseZipObject.js'

/**
 * This method is like `fromPairs` except that it accepts two arrays, one of
 * property identifiers and one of corresponding values.
 *
 * @since 0.4.0
 * @category Array
 * @example
 *   zipObject(['a', 'b'], [1, 2])
 *   // => { 'a': 1, 'b': 2 }
 *
 * @param {Array} [props] The property identifiers. Default is `[]`
 * @param {Array} [values] The property values. Default is `[]`
 * @see unzip, unzipWith, zip, zipObjectDeep, zipWith
 * @returns {Object} Returns the new object.
 */
function zipObject(props, values) {
  return baseZipObject(props || [], values || [], assignValue)
}

export default zipObject
