define(['./_Symbol'], function(_Symbol) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /** Used to convert symbols to primitives and strings. */
  var symbolProto = _Symbol ? _Symbol.prototype : undefined,
      symbolValueOf = _Symbol ? symbolProto.valueOf : undefined;

  /**
   * Creates a clone of the `symbol` object.
   *
   * @private
   * @param {Object} symbol The symbol object to clone.
   * @returns {Object} Returns the cloned symbol object.
   */
  function cloneSymbol(symbol) {
    return _Symbol ? Object(symbolValueOf.call(symbol)) : {};
  }

  return cloneSymbol;
});
