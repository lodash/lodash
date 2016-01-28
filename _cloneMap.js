import addMapEntry from './_addMapEntry';
import arrayReduce from './_arrayReduce';
import mapToArray from './_mapToArray';

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap(map) {
  var Ctor = map.constructor;
  return arrayReduce(mapToArray(map), addMapEntry, new Ctor);
}

export default cloneMap;
