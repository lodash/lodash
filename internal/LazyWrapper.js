/** Used as references for `-Infinity` and `Infinity`. */
var POSITIVE_INFINITY = Number.POSITIVE_INFINITY;

/**
 * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
 *
 * @private
 * @param {*} value The value to wrap.
 */
function LazyWrapper(value) {
  this.actions = null;
  this.dir = 1;
  this.dropCount = 0;
  this.filtered = false;
  this.iteratees = null;
  this.takeCount = POSITIVE_INFINITY;
  this.views = null;
  this.wrapped = value;
}

module.exports = LazyWrapper;
