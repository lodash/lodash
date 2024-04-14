import copyArray from './.internal/copyArray.js';
import slice from './slice.js';

/**
 * Gets `n` random elements at unique keys from `array` up to the
 * size of `array`.
 *
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to sample.
 * @param {number} [n=1] The number of elements to sample.
 * @returns {Array} Returns the random elements.
 * @example
 *
 * sampleSize([1, 2, 3], 2)
 * // => [3, 1]
 *
 * sampleSize([1, 2, 3], 4)
 * // => [2, 3, 1]
 */
function sampleSize(array, n) {
    n = n == null ? 1 : n;
    const length = array == null ? 0 : array.length;
    if (!length || n < 1) {
        return [];
    }
    n = n > length ? length : n;
    let index = -1;
    const lastIndex = length - 1;
    const result = copyArray(array);
    while (++index < n) {
        const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
        const value = result[rand];
        result[rand] = result[index];
        result[index] = value;
    }
    return slice(result, 0, n);
}

export default sampleSize;
