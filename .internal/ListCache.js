import listCacheClear from './.internal/listCacheClear.js';
import listCacheDelete from './.internal/listCacheDelete.js';
import listCacheGet from './.internal/listCacheGet.js';
import listCacheHas from './.internal/listCacheHas.js';
import listCacheSet from './.internal/listCacheSet.js';

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
class ListCache {
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

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

export default ListCache;
