define(['./_Hash', './_Map'], function(Hash, Map) {

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */
  function mapClear() {
    this.__data__ = { 'hash': new Hash, 'map': Map ? new Map : [], 'string': new Hash };
  }

  return mapClear;
});
