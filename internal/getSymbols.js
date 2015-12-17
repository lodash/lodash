define(['../utility/constant', '../lang/isNative', './toObject'], function(constant, isNative, toObject) {

  /** Native method references. */
  var getOwnPropertySymbols = isNative(getOwnPropertySymbols = Object.getOwnPropertySymbols) && getOwnPropertySymbols;

  /**
   * Creates an array of the own symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */
  var getSymbols = !getOwnPropertySymbols ? constant([]) : function(object) {
    return getOwnPropertySymbols(toObject(object));
  };

  return getSymbols;
});
