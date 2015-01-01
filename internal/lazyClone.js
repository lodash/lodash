var LazyWrapper = require('./LazyWrapper'),
    arrayCopy = require('./arrayCopy');

/**
 * Creates a clone of the lazy wrapper object.
 *
 * @private
 * @name clone
 * @memberOf LazyWrapper
 * @returns {Object} Returns the cloned `LazyWrapper` object.
 */
function lazyClone() {
  var actions = this.actions,
      iteratees = this.iteratees,
      views = this.views,
      result = new LazyWrapper(this.wrapped);

  result.actions = actions ? arrayCopy(actions) : null;
  result.dir = this.dir;
  result.dropCount = this.dropCount;
  result.filtered = this.filtered;
  result.iteratees = iteratees ? arrayCopy(iteratees) : null;
  result.takeCount = this.takeCount;
  result.views = views ? arrayCopy(views) : null;
  return result;
}

module.exports = lazyClone;
