import realNames from './_realNames.js';

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Gets the name of `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {string} Returns the function name.
 */
function getFuncName(func) {
  const result = `${ func.name }`;
  const array = realNames[result];
  let length = hasOwnProperty.call(realNames, result) ? array.length : 0;

  while (length--) {
    const data = array[length];
    const otherFunc = data.func;
    if (otherFunc == null || otherFunc == func) {
      return data.name;
    }
  }
  return result;
}

export default getFuncName;
