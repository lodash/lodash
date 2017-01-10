import MapCache from './.internal/MapCache.js';
import setCacheAdd from './.internal/setCacheAdd.js';
import setCacheHas from './.internal/setCacheHas.js';

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
class SetCache {
  constructor(values) {
    let index = -1;
    const length = values == null ? 0 : values.length;

    this.__data__ = new MapCache;
    while (++index < length) {
      this.add(values[index]);
    }
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

export default SetCache;
