import mapCacheClear from './.internal/mapCacheClear.js';
import mapCacheDelete from './.internal/mapCacheDelete.js';
import mapCacheGet from './.internal/mapCacheGet.js';
import mapCacheHas from './.internal/mapCacheHas.js';
import mapCacheSet from './.internal/mapCacheSet.js';

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
class MapCache {
  constructor(entries) {
    let index = -1;
    const length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      const entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

export default MapCache;
