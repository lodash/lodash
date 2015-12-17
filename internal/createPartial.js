define(['./createWrapper', './replaceHolders', '../function/restParam'], function(createWrapper, replaceHolders, restParam) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /**
   * Creates a `_.partial` or `_.partialRight` function.
   *
   * @private
   * @param {boolean} flag The partial bit flag.
   * @returns {Function} Returns the new partial function.
   */
  function createPartial(flag) {
    var partialFunc = restParam(function(func, partials) {
      var holders = replaceHolders(partials, partialFunc.placeholder);
      return createWrapper(func, flag, undefined, partials, holders);
    });
    return partialFunc;
  }

  return createPartial;
});
