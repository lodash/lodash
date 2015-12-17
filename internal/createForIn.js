define(['./bindCallback', '../object/keysIn'], function(bindCallback, keysIn) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /**
   * Creates a function for `_.forIn` or `_.forInRight`.
   *
   * @private
   * @param {Function} objectFunc The function to iterate over an object.
   * @returns {Function} Returns the new each function.
   */
  function createForIn(objectFunc) {
    return function(object, iteratee, thisArg) {
      if (typeof iteratee != 'function' || thisArg !== undefined) {
        iteratee = bindCallback(iteratee, thisArg, 3);
      }
      return objectFunc(object, iteratee, keysIn);
    };
  }

  return createForIn;
});
