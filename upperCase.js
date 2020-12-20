import words from './words.js'
import toString from './toString.js'

/**
 * Converts `string`, as space separated words, to upper case.
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the upper cased string.
 * @see camelCase, kebabCase, lowerCase, snakeCase, startCase, upperFirst
 * @example
 *
 * upperCase('--foo-bar')
 * // => 'FOO BAR'
 *
 * upperCase('fooBar')
 * // => 'FOO BAR'
 *
 * upperCase('__foo_bar__')
 * // => 'FOO BAR'
 */
const upperCase = (string) => {
  var result = '';
  let charCodeA = 'A'.charCodeAt(0);
  let charCodea = 'a'.charCodeAt(0);
  let charCodez = 'z'.charCodeAt(0);
  let charCodeExtended = 'Ç'.charCodeAt(0);
  for (var i = 0; i < string.length; i++) {
      var c = string.charCodeAt(i);
      if (c >= charCodea && c <= charCodez) {
          result += String.fromCharCode(c + charCodeA - charCodea);
      } else if (c >= charCodeExtended) {
          result += string.substr(i, 1).toUpperCase();
      } else {
          result += string.substr(i, 1);
      }
  }
  return result;
}

export default upperCase
