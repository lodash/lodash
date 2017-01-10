import arrayReduce from './_arrayReduce.js';
import deburr from './deburr.js';
import words from './words.js';

/** Used to compose unicode capture groups. */
const rsApos = "['\u2019]";

/** Used to match apostrophes. */
const reApos = RegExp(rsApos, 'g');

/**
 * Creates a function like `camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
  return string => arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
}

export default createCompounder;
