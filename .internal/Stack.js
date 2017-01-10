import ListCache from './.internal/ListCache.js';
import stackClear from './.internal/stackClear.js';
import stackDelete from './.internal/stackDelete.js';
import stackGet from './.internal/stackGet.js';
import stackHas from './.internal/stackHas.js';
import stackSet from './.internal/stackSet.js';

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
class Stack {
  constructor(entries) {
    const data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

export default Stack;
