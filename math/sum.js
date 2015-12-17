define(['../internal/arraySum', '../internal/baseCallback', '../internal/baseSum', '../lang/isArray', '../internal/isIterateeCall', '../internal/toIterable'], function(arraySum, baseCallback, baseSum, isArray, isIterateeCall, toIterable) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /**
   * Gets the sum of the values in `collection`.
   *
   * @static
   * @memberOf _
   * @category Math
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [iteratee] The function invoked per iteration.
   * @param {*} [thisArg] The `this` binding of `iteratee`.
   * @returns {number} Returns the sum.
   * @example
   *
   * _.sum([4, 6]);
   * // => 10
   *
   * _.sum({ 'a': 4, 'b': 6 });
   * // => 10
   *
   * var objects = [
   *   { 'n': 4 },
   *   { 'n': 6 }
   * ];
   *
   * _.sum(objects, function(object) {
   *   return object.n;
   * });
   * // => 10
   *
   * // using the `_.property` callback shorthand
   * _.sum(objects, 'n');
   * // => 10
   */
  function sum(collection, iteratee, thisArg) {
    if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
      iteratee = undefined;
    }
    iteratee = baseCallback(iteratee, thisArg, 3);
    return iteratee.length == 1
      ? arraySum(isArray(collection) ? collection : toIterable(collection), iteratee)
      : baseSum(collection, iteratee);
  }

  return sum;
});
