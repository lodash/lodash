import getSymbolsIn from './getSymbolsIn.js';
import keysIn from '../keysIn.js';

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  const result = keysIn(object);
  return Array.isArray(object) ? result : arrayPush(result, getSymbolsIn(object));
}

export default getAllKeysIn;
