define(['../internal/baseFlatten', '../internal/baseUniq', '../function/restParam'], function(baseFlatten, baseUniq, restParam) {

  /**
   * Creates an array of unique values, in order, of the provided arrays using
   * [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
   * for equality comparisons.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {...Array} [arrays] The arrays to inspect.
   * @returns {Array} Returns the new array of combined values.
   * @example
   *
   * _.union([1, 2], [4, 2], [2, 1]);
   * // => [1, 2, 4]
   */
  var union = restParam(function(arrays) {
    return baseUniq(baseFlatten(arrays, false, true));
  });

  return union;
});
