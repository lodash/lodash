/** Used to stand-in for `undefined` hash values. */

const HASH_UNDEFINED = '__lodash_hash_undefined__'

class Hash {
  constructor(size = 16) {
    this.size = 0
    this.keys = new Array(size)
    this.values = new Array(size)
  }

  clear() {
    this.size = 0
    this.keys = new Array(this.keys.length)
    this.values = new Array(this.values.length)
  }

  delete(key) {
    const index = this._indexForKey(key)
    if (index >= 0) {
      this.keys[index] = null
      this.values[index] = null
      this.size--
      return true
    }
    return false
  }

  get(key) {
    const index = this._indexForKey(key)
    if (index >= 0) {
      return this.values[index]
    }
    return undefined
  }

  has(key) {
    return this._indexForKey(key) >= 0
  }

  set(key, value) {
    let index = this._indexForKey(key)
    if (index >= 0) {
      this.values[index] = value
    } else {
      this.keys[this.size] = key
      this.values[this.size] = value
      this.size++
    }
    return this
  }

  _hashCode(key) {
    // You could use a faster hashing function here, such as MurmurHash or FNV-1a.
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) + hash + key.charCodeAt(i)
      hash = hash & hash
      hash = Math.abs(hash)
    }
    return hash
  }

  _indexForKey(key) {
    const hash = this._hashCode(key)
    const index = hash % this.keys.length
    for (let i = index; i < this.keys.length; i++) {
      if (this.keys[i] === key) {
        return i
      }
      if (this.keys[i] == null) {
        return -1
      }
    }
    for (let i = 0; i < index; i++) {
      if (this.keys[i] === key) {
        return i
      }
      if (this.keys[i] == null) {
        return -1
      }
    }
    return -1
  }
}


export default Hash
