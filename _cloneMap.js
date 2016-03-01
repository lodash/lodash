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
  return arrayReduce(mapToArray(map), addMapEntry, new map.constructor);
}

export default cloneMap;
