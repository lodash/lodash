define(['./internal/baseSum', './identity'], function(baseSum, identity) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /**
   * Computes the sum of the values in `array`.
   *
   * @static
   * @memberOf _
   * @category Math
   * @param {Array} array The array to iterate over.
   * @returns {number} Returns the sum.
   * @example
   *
   * _.sum([4, 2, 8, 6]);
   * // => 20
   */
  function sum(array) {
    return (array && array.length)
      ? baseSum(array, identity)
      : undefined;
  }

  return sum;
});
