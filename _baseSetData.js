import identity from './identity.js';
import metaMap from './_metaMap.js';

/**
 * The base implementation of `setData` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */
const baseSetData = !metaMap ? identity : (func, data) => {
  metaMap.set(func, data);
  return func;
};

export default baseSetData;
