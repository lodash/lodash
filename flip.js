import createWrap from './.internal/createWrap.js';

/** Used to compose bitmasks for function metadata. */
const WRAP_FLIP_FLAG = 512;

/**
 * Creates a function that invokes `func` with arguments reversed.
 *
 * @since 4.0.0
 * @category Function
 * @param {Function} func The function to flip arguments for.
 * @returns {Function} Returns the new flipped function.
 * @see reverse
 * @example
 *
 * const flipped = flip((...args) => args);
 *
 * flipped('a', 'b', 'c', 'd');
 * // => ['d', 'c', 'b', 'a']
 */
function flip(func) {
  return createWrap(func, WRAP_FLIP_FLAG);
}

export default flip;
