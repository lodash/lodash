import assocIndexOf from './assocIndexOf.js'

class ListCache {
  /**
   * Creates an list cache object.
   *
   * @private
   * @class
   * @param {Array} [entries] The key-value pairs to cache.
   */
  constructor(entries) {
    let index = -1
    const length = entries == null ? 0 : entries.length

    this.clear()
    while (++index < length) {
      const entry = entries[index]
      this.set(entry[0], entry[1])
    }
  }

  /**
   * Removes all key-value entries from the list cache.
   *
   * @memberof ListCache
   */
  clear() {
    this.__data__ = []
    this.size = 0
  }

  /**
   * Removes `key` and its value from the list cache.
   *
   * @memberof ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  delete(key) {
    const data = this.__data__
    const index = assocIndexOf(data, key)

    if (index < 0) {
      return false
    }
    const lastIndex = data.length - 1
    if (index == lastIndex) {
      data.pop()
    } else {
      data.splice(index, 1)
    }
    --this.size
    return true
  }

  /**
   * Gets the list cache value for `key`.
   *
   * @memberof ListCache
   * @param {string} key The key of the value to get.
   * @returns {any} Returns the entry value.
   */
  get(key) {
    const data = this.__data__
    const index = assocIndexOf(data, key)
    return index < 0 ? undefined : data[index][1]
  }

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @memberof ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  has(key) {
    return assocIndexOf(this.__data__, key) > -1
  }

  /**
   * Sets the list cache `key` to `value`.
   *
   * @memberof ListCache
   * @param {string} key The key of the value to set.
   * @param {any} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  set(key, value) {
    const data = this.__data__
    const index = assocIndexOf(data, key)

    if (index < 0) {
      ++this.size
      data.push([key, value])
    } else {
      data[index][1] = value
    }
    return this
  }
}

export default ListCache
