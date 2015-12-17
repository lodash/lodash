define(['./createWrapper', './replaceHolders', '../function/restParam'], function(createWrapper, replaceHolders, restParam) {

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
      return createWrapper(func, flag, null, partials, holders);
    });
    return partialFunc;
  }

  return createPartial;
});
