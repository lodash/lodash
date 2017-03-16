import words from '../words.js'

/** Used to match apostrophes. */
const reApos = /['\u2019]/g

/**
 * Creates a function like `camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
  return (string) => (
    words(`${ string }`.replace(reApos, '')).reduce(callback, '')
  )
}

export default createCompounder
