import arrayFilter from './.internal/arrayFilter.js';
import arrayMap from './.internal/arrayMap.js';
import baseProperty from './.internal/baseProperty.js';
import baseTimes from './.internal/baseTimes.js';
import isArrayLikeObject from './isArrayLikeObject.js';

/* Built-in method references for those with the same name as other `lodash` methods. */
const nativeMax = Math.max;

/**
 * This method is like `zip` except that it accepts an array of grouped
 * elements and creates an array regrouping the elements to their pre-zip
 * configuration.
 *
 * @since 1.2.0
 * @category Array
 * @param {Array} array The array of grouped elements to process.
 * @returns {Array} Returns the new array of regrouped elements.
 * @see unzipWith, zip, zipObject, zipObjectDeep, zipWith
 * @example
 *
 * const zipped = zip(['a', 'b'], [1, 2], [true, false]);
 * // => [['a', 1, true], ['b', 2, false]]
 *
 * unzip(zipped);
 * // => [['a', 'b'], [1, 2], [true, false]]
 */
function unzip(array) {
  if (!(array && array.length)) {
    return [];
  }
  let length = 0;
  array = arrayFilter(array, group => {
    if (isArrayLikeObject(group)) {
      length = nativeMax(group.length, length);
      return true;
    }
  });
  return baseTimes(length, index => arrayMap(array, baseProperty(index)));
}

export default unzip;
