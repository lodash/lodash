define(['./_addMapEntry', './_arrayReduce', './_mapToArray'], function(addMapEntry, arrayReduce, mapToArray) {

  /**
   * Creates a clone of `map`.
   *
   * @private
   * @param {Object} map The map to clone.
   * @returns {Object} Returns the cloned map.
   */
  function cloneMap(map) {
    return arrayReduce(mapToArray(map), addMapEntry, new map.constructor);
  }

  return cloneMap;
});
