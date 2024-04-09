/**
 * Gets the last [n] element(s) of `array`.
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {Object} n The number of elements.
 * @returns {*} Returns the last [n] element(s) of `array`.
 * @example
 *
 * last([1, 2, 3])
 * // => 3
 *
 * last([1, 2, 3], { n: 2 })
 * // => [2, 3]
 */
function last(array = [], options = {}) {
    const { n = 1 } = options;
    const results = array.slice(-n);
    return results.length > 1 ? results : results[0];
}

export default last;
