import toInteger from './toInteger.js';

/** Error message constants. */
const FUNC_ERROR_TEXT = 'Expected a function';

/**
 * The opposite of `before`; this method creates a function that invokes
 * `func` once it's called `n` or more times.
 *
 * @static
 * @since 0.1.0
 * @category Function
 * @param {number} n The number of calls before `func` is invoked.
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * var saves = ['profile', 'settings'];
 *
 * var done = after(saves.length, function() {
 *   console.log('done saving!');
 * });
 *
 * forEach(saves, function(type) {
 *   asyncSave({ 'type': type, 'complete': done });
 * });
 * // => Logs 'done saving!' after the two async saves have completed.
 */
function after(n, func) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  n = toInteger(n);
  return function(...args) {
    if (--n < 1) {
      return func.apply(this, args);
    }
  };
}

export default after;
