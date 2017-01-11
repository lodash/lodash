import arrayPush from './arrayPush.js';
import getSymbols from './getSymbols.js';
import stubArray from '../stubArray.js';

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
    object = Object.getPrototypeOf(Object(object));
  }
  return result;
};

export default getSymbolsIn;
