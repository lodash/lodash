import assocIndexOf from './.internal/assocIndexOf.js';

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  const data = this.__data__;
  const index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

export default listCacheGet;
