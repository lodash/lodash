/** Used to generate unique IDs. */
const idCounter = {}

/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 *
 * @since 0.1.0
 * @category Util
 * @param {string} [prefix=''] The value to prefix the ID with.
 * @returns {string} Returns the unique ID.
 * @see random
 * @example
 *
 * uniqueId('contact_')
 * // => 'contact_104'
 *
 * uniqueId()
 * // => '105'
 */
function uniqueId(prefix='') {
  prefix = String(prefix)
  prefix += /\d$/.test(prefix) ? '_' : ''
  idCounter[prefix] = (idCounter[prefix] || 0) + 1
  return `${prefix}${idCounter[prefix]}`
}

export default uniqueId
