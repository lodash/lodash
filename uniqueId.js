/** Used to generate unique IDs. */
const idCounter = {}

/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 *
 * @since 0.1.0
 * @category Util
 * @example
 *   uniqueId('contact_')
 *   // => 'contact_104'
 *
 *   uniqueId()
 *   // => '105'
 *
 * @param {string} [prefix] The value to prefix the ID with. Default is `''`
 * @see random
 * @returns {string} Returns the unique ID.
 */
function uniqueId(prefix = '$lodash$') {
  if (!idCounter[prefix]) {
    idCounter[prefix] = 0
  }

  const id = ++idCounter[prefix]
  if (prefix === '$lodash$') {
    return `${id}`
  }

  return `${prefix}${id}`
}

export default uniqueId
