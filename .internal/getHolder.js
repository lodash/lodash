/**
 * Gets the argument placeholder value for `func`.
 *
 * @private
 * @param {Function} func The function to inspect.
 * @returns {any} Returns the placeholder value.
 */
function getHolder(func) {
  const object = func
  return object.placeholder
}

export default getHolder
