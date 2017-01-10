/** Used for built-in method references. */
const arrayProto = Array.prototype;

/* Built-in method references for those with the same name as other `lodash` methods. */
const nativeJoin = arrayProto.join;

/**
 * Converts all elements in `array` into a string separated by `separator`.
 *
 * @static
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to convert.
 * @param {string} [separator=','] The element separator.
 * @returns {string} Returns the joined string.
 * @example
 *
 * join(['a', 'b', 'c'], '~');
 * // => 'a~b~c'
 */
function join(array, separator) {
  return array == null ? '' : nativeJoin.call(array, separator);
}

export default join;
