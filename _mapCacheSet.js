import getMapData from './_getMapData.js';

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  const data = getMapData(this, key);
  const size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

export default mapCacheSet;
