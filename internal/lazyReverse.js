var LazyWrapper = require('./LazyWrapper');

/**
 * Reverses the direction of lazy iteration.
 *
 * @private
 * @name reverse
 * @memberOf LazyWrapper
 * @returns {Object} Returns the new reversed `LazyWrapper` object.
 */
function lazyReverse() {
  if (this.filtered) {
    var result = new LazyWrapper(this);
    result.dir = -1;
    result.filtered = true;
  } else {
    result = this.clone();
    result.dir *= -1;
  }
  return result;
}

module.exports = lazyReverse;
