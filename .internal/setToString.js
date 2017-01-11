import baseSetToString from './baseSetToString.js';
import shortOut from './shortOut.js';

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
const setToString = shortOut(baseSetToString);

export default setToString;
