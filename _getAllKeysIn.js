import baseGetAllKeys from './_baseGetAllKeys';
import getSymbolsIn from './_getSymbolsIn';
import keysIn from './keysIn';

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

export default getAllKeysIn;
