define(['./_baseCreate', './_baseLodash'], function(baseCreate, baseLodash) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /**
   * The base constructor for creating `lodash` wrapper objects.
   *
   * @private
   * @param {*} value The value to wrap.
   * @param {boolean} [chainAll] Enable explicit method chain sequences.
   */
  function LodashWrapper(value, chainAll) {
    this.__wrapped__ = value;
    this.__actions__ = [];
    this.__chain__ = !!chainAll;
    this.__index__ = 0;
    this.__values__ = undefined;
  }

  LodashWrapper.prototype = baseCreate(baseLodash.prototype);
  LodashWrapper.prototype.constructor = LodashWrapper;

  return LodashWrapper;
});
