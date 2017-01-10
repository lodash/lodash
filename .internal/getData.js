import metaMap from './.internal/metaMap.js';

/**
 * Gets metadata for `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {*} Returns the metadata for `func`.
 */
const getData = metaMap
  ? func => metaMap.get(func)
  : () => {};

export default getData;
