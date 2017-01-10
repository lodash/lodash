import apply from './.internal/apply.js';
import arrayMap from './.internal/arrayMap.js';

/**
 * Creates a function that iterates over `pairs` and invokes the corresponding
 * function of the first predicate to return truthy. The predicate-function
 * pairs are invoked with the `this` binding and arguments of the created
 * function.
 *
 * @since 4.0.0
 * @category Util
 * @param {Array} pairs The predicate-function pairs.
 * @returns {Function} Returns the new composite function.
 * @example
 *
 * const func = cond([
 *   [matches({ 'a': 1 }),         constant('matches A')],
 *   [conforms({ 'b': isNumber }), constant('matches B')],
 *   [stubTrue,                    constant('no match')]
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
      throw new TypeError('Expected a function');
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
