define(['../internal/baseDifference', '../lang/isArguments', '../lang/isArray', '../function/restParam'], function(baseDifference, isArguments, isArray, restParam) {

  /**
   * Creates an array excluding all provided values using `SameValueZero` for
   * equality comparisons.
   *
   * **Note:** [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
   * comparisons are like strict equality comparisons, e.g. `===`, except that
   * `NaN` matches `NaN`.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array to filter.
   * @param {...*} [values] The values to exclude.
   * @returns {Array} Returns the new array of filtered values.
   * @example
   *
   * _.without([1, 2, 1, 3], 1, 2);
   * // => [3]
   */
  var without = restParam(function(array, values) {
    return (isArray(array) || isArguments(array))
      ? baseDifference(array, values)
      : [];
  });

  return without;
});
