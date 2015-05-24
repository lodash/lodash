import LazyWrapper from './LazyWrapper';
import getData from './getData';
import getFuncName from './getFuncName';
import lodash from '../chain/lodash';

/**
 * Checks if `func` has a lazy counterpart.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` has a lazy counterpart, else `false`.
 */
function isLaziable(func) {
  var funcName = getFuncName(func);
  if (!(funcName in LazyWrapper.prototype)) {
    return false;
  }
  var other = lodash[funcName];
  if (func === other) {
    return true;
  }
  var data = getData(other);
  return !!data && func === data[0];
}

export default isLaziable;
