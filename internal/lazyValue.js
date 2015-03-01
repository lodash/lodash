var baseWrapperValue = require('./baseWrapperValue'),
    getView = require('./getView'),
    isArray = require('../lang/isArray');

/** Used to indicate the type of lazy iteratees. */
var LAZY_DROP_WHILE_FLAG = 0,
    LAZY_MAP_FLAG = 2,
    LAZY_TAKE_WHILE_FLAG = 3;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * Extracts the unwrapped value from its lazy wrapper.
 *
 * @private
 * @name value
 * @memberOf LazyWrapper
 * @returns {*} Returns the unwrapped value.
 */
function lazyValue() {
  var array = this.__wrapped__.value();
  if (!isArray(array)) {
    return baseWrapperValue(array, this.__actions__);
  }
  var dir = this.__dir__,
      isRight = dir < 0,
      view = getView(0, array.length, this.__views__),
      start = view.start,
      end = view.end,
      length = end - start,
      dropCount = this.__dropCount__,
      takeCount = nativeMin(length, this.__takeCount__),
      index = isRight ? end : start - 1,
      iteratees = this.__iteratees__,
      iterLength = iteratees ? iteratees.length : 0,
      resIndex = 0,
      result = [];

  outer:
  while (length-- && resIndex < takeCount) {
    index += dir;

    var iterIndex = -1,
        value = array[index];

    while (++iterIndex < iterLength) {
      var data = iteratees[iterIndex],
          iteratee = data.iteratee,
          type = data.type;

      if (type != LAZY_DROP_WHILE_FLAG) {
        var computed = iteratee(value);
      } else {
        data.done = data.done && (isRight ? index < data.index : index > data.index);
        data.index = index;
        computed = data.done || (data.done = !iteratee(value));
      }
      if (type == LAZY_MAP_FLAG) {
        value = computed;
      } else if (!computed) {
        if (type == LAZY_TAKE_WHILE_FLAG) {
          break outer;
        } else {
          continue outer;
        }
      }
    }
    if (dropCount) {
      dropCount--;
    } else {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = lazyValue;
