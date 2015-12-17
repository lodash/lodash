define(['../internal/baseDifference', '../internal/baseFlatten', '../internal/isArrayLike', '../internal/isObjectLike', '../function/restParam'], function(baseDifference, baseFlatten, isArrayLike, isObjectLike, restParam) {

  /**
   * Creates an array of unique `array` values not included in the other
   * provided arrays using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {...Array} [values] The arrays of values to exclude.
   * @returns {Array} Returns the new array of filtered values.
   * @example
   *
   * _.difference([1, 2, 3], [4, 2]);
   * // => [1, 3]
   */
  var difference = restParam(function(array, values) {
    return (isObjectLike(array) && isArrayLike(array))
      ? baseDifference(array, baseFlatten(values, false, true))
      : [];
  });

  return difference;
});
