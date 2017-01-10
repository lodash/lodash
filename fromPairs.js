/**
 * The inverse of `toPairs`; this method returns an object composed
 * from key-value `pairs`.
 *
 * @since 4.0.0
 * @category Array
 * @param {Array} pairs The key-value pairs.
 * @returns {Object} Returns the new object.
 * @example
 *
 * fromPairs([['a', 1], ['b', 2]]);
 * // => { 'a': 1, 'b': 2 }
 */
function fromPairs(pairs) {
  let index = -1;
  const length = pairs == null ? 0 : pairs.length;
  const result = {};

  while (++index < length) {
    const pair = pairs[index];
    result[pair[0]] = pair[1];
  }
  return result;
}

export default fromPairs;
