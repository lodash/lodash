import filter from './filter.js';
import map from './map.js';
import baseProperty from './.internal/baseProperty.js';
import isArrayLikeObject from './isArrayLikeObject.js';

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
 * const zipped = zip(['a', 'b'], [1, 2], [true, false])
 * // => [['a', 1, true], ['b', 2, false]]
 *
 * unzip(zipped)
 * // => [['a', 'b'], [1, 2], [true, false]]
 */
function unzip(array) {
    if (!(array != null && array.length)) {
        return [];
    }
    let length = 0;
    // eslint-disable-next-line consistent-return
    array = filter(array, (group) => {
        if (isArrayLikeObject(group)) {
            length = Math.max(group.length, length);
            return true;
        }
    });
    let index = -1;
    const result = new Array(length);
    while (++index < length) {
        result[index] = map(array, baseProperty(index));
    }
    return result;
}

export default unzip;
