import arrayReduce from './arrayReduce.js';
import toString from '../toString.js';
import words from '../words.js';

/** Used to match apostrophes. */
const reApos = /['\u2019]/g;

/**
 * Creates a function like `camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
  return string => (
    arrayReduce(words(toString(string).replace(reApos, '')), callback, '')
  );
}

export default createCompounder;
