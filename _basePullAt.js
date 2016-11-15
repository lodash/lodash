import castPath from './_castPath.js';
import isIndex from './_isIndex.js';
import last from './last.js';
import parent from './_parent.js';
import toKey from './_toKey.js';

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * The base implementation of `_.pullAt` without support for individual
 * indexes or capturing the removed elements.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {number[]} indexes The indexes of elements to remove.
 * @returns {Array} Returns `array`.
 */
function basePullAt(array, indexes) {
  var length = array ? indexes.length : 0,
      lastIndex = length - 1;

  while (length--) {
    var index = indexes[length];
    if (length == lastIndex || index !== previous) {
      var previous = index;
      if (isIndex(index)) {
        splice.call(array, index, 1);
      }
      else {
        var path = castPath(index, array),
            object = parent(array, path);

        if (object != null) {
          delete object[toKey(last(path))];
        }
      }
    }
  }
  return array;
}

export default basePullAt;
