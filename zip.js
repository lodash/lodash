import unzip from './unzip.js'

/**
 * Creates an array of grouped elements, the first of which contains the first
 * elements of the given arrays, the second of which contains the second
 * elements of the given arrays, and so on.
 *
 * @since 0.1.0
 * @category Array
 * @example
 *   zip(['a', 'b'], [1, 2], [true, false])
 *   // => [['a', 1, true], ['b', 2, false]]
 *
 * @param {...Array} [arrays] The arrays to process.
 * @see unzip, unzipWith, zipObject, zipObjectDeep, zipWith
 * @returns {Array} Returns the new array of grouped elements.
 */
function zip(...arrays) {
  return unzip(arrays)
}

export default zip
