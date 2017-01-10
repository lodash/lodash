import arrayPush from './.internal/arrayPush.js';
import getPrototype from './.internal/getPrototype.js';
import getSymbols from './.internal/getSymbols.js';
import stubArray from './stubArray.js';

/* Built-in method references for those with the same name as other `lodash` methods. */
const nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
const getSymbolsIn = !nativeGetSymbols ? stubArray : object => {
  const result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

export default getSymbolsIn;
