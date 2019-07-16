/** Used to match `RegExp` flags from their coerced string values. */
const reFlags = /\w*$/

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  const flags = reFlags.exec(regexp);
  const result = new regexp.constructor(regexp.source, flags[0] === 'undefined' ? undefined : flags);
  result.lastIndex = regexp.lastIndex
  return result
}

export default cloneRegExp
