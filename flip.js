import createWrap from './.internal/createWrap.js';

/** Used to compose bitmasks for function metadata. */
const WRAP_FLIP_FLAG = 512;

/**
 * Creates a function that invokes `func` with arguments reversed.
 *
 * @static
 * @since 4.0.0
 * @category Function
 * @param {Function} func The function to flip arguments for.
 * @returns {Function} Returns the new flipped function.
 * @example
 *
 * var flipped = flip(function() {
 *   return toArray(arguments);
 * });
 *
 * flipped('a', 'b', 'c', 'd');
 * // => ['d', 'c', 'b', 'a']
 */
function flip(func) {
  return createWrap(func, WRAP_FLIP_FLAG);
}

export default flip;
