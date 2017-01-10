import getWrapDetails from './.internal/getWrapDetails.js';
import insertWrapDetails from './.internal/insertWrapDetails.js';
import setToString from './.internal/setToString.js';
import updateWrapDetails from './.internal/updateWrapDetails.js';

/**
 * Sets the `toString` method of `wrapper` to mimic the source of `reference`
 * with wrapper details in a comment at the top of the source body.
 *
 * @private
 * @param {Function} wrapper The function to modify.
 * @param {Function} reference The reference function.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Function} Returns `wrapper`.
 */
function setWrapToString(wrapper, reference, bitmask) {
  const source = `${ reference }`;
  return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
}

export default setWrapToString;
