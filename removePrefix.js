import toString from './toString.js'

/**
 * Removes a prefix from a string if the string starts with the prefix.
 *
 * @since 5.0.0
 * @category String
 * @param {string} string The string to remove the prefix.
 * @param {string} prefix The prefix to remove from the string.
 * @returns {string} Returns the string with the prefix removed.
 * @see removeSuffix
 * @example
 *
 * removePrefix('https://example.com', 'https://')
 * // => 'example.com'
 *
 * removePrefix('example.com', 'https://')
 * // => 'example.com'
 *
 * removePrefix('-_-abc-_-', '-_-')
 * // => 'abc-_-'
 *
 * removePrefix('-_-abc-_-', '_-')
 * // => '-_-abc-_-'
 */
const removePrefix = (string, prefix) => {
  string = toString(string)
  prefix = toString(prefix)

  if (string.startsWith(prefix)) {
    return string.substr(prefix.length);
  }
  return string;
}

export default removePrefix
