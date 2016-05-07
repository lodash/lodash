define(['./_ListCache', './_stackClear', './_stackDelete', './_stackGet', './_stackHas', './_stackSet'], function(ListCache, stackClear, stackDelete, stackGet, stackHas, stackSet) {

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Stack(entries) {
    this.__data__ = new ListCache(entries);
  }

  // Add methods to `Stack`.
  Stack.prototype.clear = stackClear;
  Stack.prototype['delete'] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;

  return Stack;
});
