import arrayEach from './_arrayEach.js';
import arrayIncludes from './_arrayIncludes.js';

/** Used to compose bitmasks for function metadata. */
const WRAP_BIND_FLAG = 1;
const WRAP_BIND_KEY_FLAG = 2;
const WRAP_CURRY_FLAG = 8;
const WRAP_CURRY_RIGHT_FLAG = 16;
const WRAP_PARTIAL_FLAG = 32;
const WRAP_PARTIAL_RIGHT_FLAG = 64;
const WRAP_ARY_FLAG = 128;
const WRAP_REARG_FLAG = 256;
const WRAP_FLIP_FLAG = 512;

/** Used to associate wrap methods with their bit flags. */
const wrapFlags = [
  ['ary', WRAP_ARY_FLAG],
  ['bind', WRAP_BIND_FLAG],
  ['bindKey', WRAP_BIND_KEY_FLAG],
  ['curry', WRAP_CURRY_FLAG],
  ['curryRight', WRAP_CURRY_RIGHT_FLAG],
  ['flip', WRAP_FLIP_FLAG],
  ['partial', WRAP_PARTIAL_FLAG],
  ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],
  ['rearg', WRAP_REARG_FLAG]
];

/**
 * Updates wrapper `details` based on `bitmask` flags.
 *
 * @private
 * @returns {Array} details The details to modify.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Array} Returns `details`.
 */
function updateWrapDetails(details, bitmask) {
  arrayEach(wrapFlags, pair => {
    const value = `${ pair[0] }`;
    if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
      details.push(value);
    }
  });
  return details.sort();
}

export default updateWrapDetails;
