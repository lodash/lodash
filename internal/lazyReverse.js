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
  var filtered = this.filtered,
      result = filtered ? new LazyWrapper(this) : this.clone();

  result.dir = this.dir * -1;
  result.filtered = filtered;
  return result;
}

module.exports = lazyReverse;
