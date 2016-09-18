define(['./constant', './identity', './_nativeDefineProperty'], function(constant, identity, nativeDefineProperty) {

  /**
   * The base implementation of `setToString` without support for hot loop shorting.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var baseSetToString = !nativeDefineProperty ? identity : function(func, string) {
    return nativeDefineProperty(func, 'toString', {
      'configurable': true,
      'enumerable': false,
      'value': constant(string),
      'writable': true
    });
  };

  return baseSetToString;
});
