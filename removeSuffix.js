import toString from './toString.js'

/**
 * Removes a suffix from a string if the string ends with the suffix.
 *
 * @since 5.0.0
 * @category String
 * @param {string} string The string to remove the suffix.
 * @param {string} suffix The suffix to remove from the string.
 * @returns {string} Returns the string with the suffix removed.
 * @see removePrefix
 * @example
 *
 * removeSuffix('example.com', '.com')
 * // => 'example'
 *
 * removeSuffix('example', '.com')
 * // => 'example'
 *
 * removeSuffix('-_-abc-_-', '-_-')
 * // => '-_-abc'
 *
 * removeSuffix('-_-abc-_-', '-_')
 * // => '-_-abc-_-'
 */
const removeSuffix = (string, suffix) => {
  string = toString(string)
  suffix = toString(suffix)

  if (string.endsWith(suffix)) {
    return string.substr(0, string.length - suffix.length);
  }
  return string;
}

export default removeSuffix
