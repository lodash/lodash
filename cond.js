import apply from './_apply.js';
import arrayMap from './_arrayMap.js';

/** Error message constants. */
const FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that iterates over `pairs` and invokes the corresponding
 * function of the first predicate to return truthy. The predicate-function
 * pairs are invoked with the `this` binding and arguments of the created
 * function.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Util
 * @param {Array} pairs The predicate-function pairs.
 * @returns {Function} Returns the new composite function.
 * @example
 *
 * var func = _.cond([
 *   [_.matches({ 'a': 1 }),           _.constant('matches A')],
 *   [_.conforms({ 'b': _.isNumber }), _.constant('matches B')],
 *   [_.stubTrue,                      _.constant('no match')]
 * ]);
 *
 * func({ 'a': 1, 'b': 2 });
 * // => 'matches A'
 *
 * func({ 'a': 0, 'b': 1 });
 * // => 'matches B'
 *
 * func({ 'a': '1', 'b': '2' });
 * // => 'no match'
 */
function cond(pairs) {
  const length = pairs == null ? 0 : pairs.length;

  pairs = !length ? [] : arrayMap(pairs, pair => {
    if (typeof pair[1] != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    return [pair[0], pair[1]];
  });

  return (...args) => {
    let index = -1;
    while (++index < length) {
      const pair = pairs[index];
      if (apply(pair[0], this, args)) {
        return apply(pair[1], this, args);
      }
    }
  };
}

export default cond;
